import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useResetPasswordMutation } from "../../../services/userService.ts";
import { useNavigate, useParams } from "react-router";
import InputField from "../../inputs/InputField.tsx";
import BaseButton from "../../buttons/BaseButton.tsx";
import type { IResetPasswordConfirm } from "../../../types/users/IResetPasswordConfirm.ts";

const ResetPasswordForm: React.FC = () => {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const { uid, token } = useParams<{ uid: string; token: string }>();

    const validationSchema = Yup.object({
        new_password: Yup.string()
            .required("Введіть новий пароль")
            .min(8, "Пароль має містити щонайменше 8 символів"),
        confirm_password: Yup.string()
            .required("Підтвердіть пароль")
            .oneOf([Yup.ref("new_password")], "Паролі не співпадають"),
    });

    const formik = useFormik<IResetPasswordConfirm>({
        initialValues: {
            uid: uid || "",
            token: token || "",
            new_password: "",
            confirm_password: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            if (!uid || !token) {
                alert("Невірне або неповне посилання для скидання паролю");
                return;
            }

            try {
                await resetPassword(values).unwrap();
                navigate("/login");
            } catch (err: any) {
                console.error(err);
                alert(err?.data?.detail || "Помилка при зміні паролю");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
            <InputField
                label="Новий пароль"
                name="new_password"
                type="password"
                placeholder="********"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                touched={formik.touched.new_password}
                error={formik.errors.new_password}
            />

            <InputField
                label="Підтвердження паролю"
                name="confirm_password"
                type="password"
                placeholder="********"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                touched={formik.touched.confirm_password}
                error={formik.errors.confirm_password}
            />

            <BaseButton
                variant="primary"
                size="lg"
                isLoading={isLoading || formik.isSubmitting}
                className="text-sm font-medium rounded-lg px-4 py-2 w-full mt-2 flex items-center justify-center gap-2"
                onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                Змінити пароль
            </BaseButton>
        </form>
    );
};

export default ResetPasswordForm;