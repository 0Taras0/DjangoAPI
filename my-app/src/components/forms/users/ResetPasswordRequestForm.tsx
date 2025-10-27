import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useResetPasswordRequestMutation } from "../../../services/userService.ts";
import { useNavigate } from "react-router";
import InputField from "../../inputs/InputField.tsx";
import BaseButton from "../../buttons/BaseButton.tsx";
import type { IResetPasswordRequest } from "../../../types/users/IResetPasswordRequest.ts";

const ResetPasswordRequestForm: React.FC = () => {
    const [resetRequest, { isLoading }] = useResetPasswordRequestMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Невірний формат email")
            .required("Email є обов’язковим"),
    });

    const formik = useFormik<IResetPasswordRequest>({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const result = await resetRequest(values).unwrap();
                console.log(result);
                navigate("/success-confirm");
            } catch (err: any) {
                console.error(err?.data?.errors?.Name?.[0]);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full">
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

            <BaseButton
                variant="primary"
                size="lg"
                isLoading={isLoading || formik.isSubmitting}
                className="w-full text-sm font-medium rounded-lg px-4 py-2 flex items-center justify-center gap-2"
                onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                Reset
            </BaseButton>
        </form>
    );
};

export default ResetPasswordRequestForm;