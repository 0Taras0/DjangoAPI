import { useCreatePostMutation } from "../../../services/postService.ts";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { UploadFile } from "antd";
import type { ICreatePostRequest } from "../../../types/posts/ICreatePostRequest.ts";
import InputField from "../../inputs/InputField.tsx";
import ImageUploader from "../../uploaders/ImageUploader.tsx";
import VideoUploader from "../../uploaders/VideoUploader.tsx";
import BaseButton from "../../buttons/BaseButton.tsx";
import {useNavigate} from "react-router";
import {useAppSelector} from "../../../store";

const PostCreateForm: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [createPost, { isLoading }] = useCreatePostMutation();
    const [imageList, setImageList] = useState<UploadFile[]>([]);
    const [videoList, setVideoList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title: Yup.string().required("Заголовок є обов’язковим"),
        body: Yup.string().required("Опис є обов’язковим"),
        topic_id: Yup.number().required("Оберіть тему"),
        video_url: Yup.string().url("Невірне посилання").nullable(),
    });

    const formik = useFormik<ICreatePostRequest>({
        initialValues: {
            title: "",
            body: "",
            topic_id: 1,
            user_id: user!.id,
            image: null,
            video: null,
            video_url: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setImageError(false);
            setVideoError(false);
            try {
                const payload: ICreatePostRequest = {
                    ...values,
                    image: imageList[0]?.originFileObj || null,
                    video: videoList[0]?.originFileObj || null,
                };

                console.log("Payload:", payload);

                const result = await createPost(payload).unwrap();
                resetForm();
                setImageList([]);
                setVideoList([]);
                navigate("/posts");
            } catch (err) {
                console.error("Помилка при створенні поста:", err);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-semibold text-center mb-2">
                Створення поста
            </h2>

            <InputField
                label="Заголовок"
                name="title"
                placeholder="Введіть заголовок"
                value={formik.values.title}
                onChange={formik.handleChange}
                touched={formik.touched.title}
                error={formik.errors.title}
            />

            <InputField
                label="Опис"
                name="body"
                placeholder="Введіть текст поста"
                value={formik.values.body}
                onChange={formik.handleChange}
                touched={formik.touched.body}
                error={formik.errors.body}
            />

            <InputField
                label="ID теми"
                name="topic_id"
                value={formik.values.topic_id.toString() || ""}
                onChange={formik.handleChange}
                touched={formik.touched.topic_id}
                error={formik.errors.topic_id}
            />

            <InputField
                label="Посилання на відео (опціонально)"
                name="video_url"
                placeholder="https://example.com/video"
                value={formik.values.video_url}
                onChange={formik.handleChange}
                touched={formik.touched.video_url}
                error={formik.errors.video_url}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Зображення
                    </label>
                    <ImageUploader
                        fileList={imageList}
                        setFileList={setImageList}
                        imageError={imageError}
                        setImageError={setImageError}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Відео
                    </label>
                    <VideoUploader
                        fileList={videoList}
                        setFileList={setVideoList}
                        videoError={videoError}
                        setVideoError={setVideoError}
                    />
                </div>
            </div>

            <BaseButton
                variant="primary"
                size="lg"
                isLoading={isLoading || formik.isSubmitting}
                className="text-sm font-medium rounded-lg px-4 py-2 w-full mt-4 flex items-center justify-center gap-2"
                onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                СТВОРИТИ ПОСТ
            </BaseButton>
        </form>
    );
};

export default PostCreateForm;