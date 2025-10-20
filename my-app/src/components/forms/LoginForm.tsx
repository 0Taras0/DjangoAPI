import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useLoginMutation, useLoginByGoogleMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useGoogleLogin} from "@react-oauth/google";
import InputField from "../inputs/InputField.tsx";
import BaseButton from "../buttons/BaseButton.tsx";
import type {ILoginRequest} from "../../types/users/ILoginRequest.ts";

const LoginForm: React.FC = () => {
    const [login, {isLoading}] = useLoginMutation();
    const [loginByGoogle, {isLoading: isGoogleLoading}] = useLoginByGoogleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {executeRecaptcha} = useGoogleReCaptcha();

    const validationSchema = Yup.object({
        username: Yup.string().required("Ім'я користувача є обов’язковим"),
        password: Yup.string().required("Пароль є обов’язковим"),
    });

    const formik = useFormik<ILoginRequest>({
        initialValues: {
            username: "",
            password: "",
            recaptcha_token: "",
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            if (!executeRecaptcha) return;

            try {
                const token = await executeRecaptcha("login");
                const payload: ILoginRequest = {...values, recaptcha_token: token};

                const result = await login(payload).unwrap();
                dispatch(setTokens(result));
                navigate("/");
            } catch (err: any) {
                if (err?.data?.errors) {
                    const formatted: Record<string, string> = {};
                    for (const [key, val] of Object.entries(err.data.errors)) {
                        formatted[key] = Array.isArray(val) ? val[0] : String(val);
                    }
                }
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
                navigate('/');
            } catch (err: any) {
                console.error(err?.data?.errors?.Name?.[0]);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
                label="User name"
                name="username"
                placeholder="Хустон"
                value={formik.values.username}
                onChange={formik.handleChange}
                touched={formik.touched.username}
                error={formik.errors.username}
            />

            <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Введіть ваш пароль"
                value={formik.values.password}
                onChange={formik.handleChange}
                touched={formik.touched.password}
                error={formik.errors.password}
            />

            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
            </Link>

            <BaseButton
                variant="primary"
                size="lg"
                isLoading={isLoading || formik.isSubmitting}
                className="text-sm font-medium rounded-lg px-4 py-2 w-full mt-2 flex items-center justify-center gap-2"
                onClick={(event) => {
                    event.preventDefault();
                    formik.handleSubmit();
                }}
            >
                Log in
            </BaseButton>

            <BaseButton
                onClick={(event) => {
                    event.preventDefault();
                    loginUseGoogle();
                }}
                variant="ghost"
                size="lg"
                isLoading={isGoogleLoading}
                iconLeft="https://www.svgrepo.com/show/355037/google.svg"
                className="text-sm font-medium rounded-lg px-4 py-2 w-full mt-2 flex items-center justify-center gap-2"
            >
                Log in with Google
            </BaseButton>
        </form>
    );
};

export default LoginForm;