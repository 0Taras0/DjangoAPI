import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRegisterMutation, useLoginByGoogleMutation} from "../../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useGoogleLogin} from "@react-oauth/google";
import InputField from "../../inputs/InputField.tsx";
import BaseButton from "../../buttons/BaseButton.tsx";
import ImageUploader from "../../uploaders/ImageUploader.tsx";
import type {UploadFile} from "antd";
import type {IUserRegister} from "../../../types/users/IUserRegister.ts";

const RegisterForm: React.FC = () => {
    const [register, {isLoading}] = useRegisterMutation();
    const [loginByGoogle, {isLoading: isGoogleLoading}] = useLoginByGoogleMutation();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {executeRecaptcha} = useGoogleReCaptcha();

    const validationSchema = Yup.object({
        username: Yup.string().required("Ім’я користувача є обов’язковим"),
        first_name: Yup.string().required("Ім’я є обов’язковим"),
        last_name: Yup.string().required("Прізвище є обов’язковим"),
        email: Yup.string()
            .email("Невірний формат email")
            .required("Email є обов’язковим"),
        password: Yup.string()
            .min(6, "Мінімум 6 символів")
            .required("Пароль є обов’язковим"),
    });

    const formik = useFormik<IUserRegister>({
        initialValues: {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            recaptcha_token: "",
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            if (!executeRecaptcha) return;

            if (fileList.length === 0 || !fileList[0]?.originFileObj) {
                setImageError(true);
                setSubmitting(false);
                return;
            }

            try {
                const token = await executeRecaptcha("register");

                const payload: IUserRegister = {
                    ...values,
                    image: fileList[0].originFileObj,
                    recaptcha_token: token,
                };

                const result = await register(payload).unwrap();
                dispatch(setTokens(result));
                navigate("/posts");
            } catch (err) {
                console.error("Registration error:", err);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const result = await loginByGoogle(tokenResponse.access_token).unwrap();
                dispatch(setTokens(result));
                navigate("/");
            } catch (err) {
                console.error("Google login error:", err);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
                label="Username"
                name="username"
                placeholder="johnsmith"
                value={formik.values.username}
                onChange={formik.handleChange}
                touched={formik.touched.username}
                error={formik.errors.username}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="First name"
                    name="first_name"
                    placeholder="John"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    touched={formik.touched.first_name}
                    error={formik.errors.first_name}
                />

                <InputField
                    label="Last name"
                    name="last_name"
                    placeholder="Smith"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    touched={formik.touched.last_name}
                    error={formik.errors.last_name}
                />
            </div>

            <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="johnsmith@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                touched={formik.touched.email}
                error={formik.errors.email}
            />

            <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                touched={formik.touched.password}
                error={formik.errors.password}
            />

            <div className="w-full text-center">
                <label className="block text-sm font-medium mb-1">Зображення</label>
                <ImageUploader
                    fileList={fileList}
                    setFileList={setFileList}
                    imageError={imageError}
                    setImageError={setImageError}
                />
            </div>

            <BaseButton
                variant="primary"
                size="lg"
                isLoading={isLoading || formik.isSubmitting}
                className="text-sm font-medium rounded-lg px-4 py-2 w-full mt-4 flex items-center justify-center gap-2"
                onClick={(event) => {
                    event.preventDefault();
                    formik.handleSubmit();
                }}
            >
                REGISTER NOW
            </BaseButton>

            <BaseButton
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    loginUseGoogle();
                }}
                variant="ghost"
                size="lg"
                isLoading={isGoogleLoading}
                iconLeft="https://www.svgrepo.com/show/355037/google.svg"
                className="text-sm font-medium rounded-lg px-4 py-2 w-full mt-4 flex items-center justify-center gap-2"
            >
                Log in with Google
            </BaseButton>

            <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Log in
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;