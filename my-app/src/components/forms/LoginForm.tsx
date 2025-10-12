import {Form, Input, Button, type FormProps} from "antd";
import {useLoginMutation, useLoginByGoogleMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import type {ILoginRequest} from "../../types/users/ILoginRequest.ts";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useGoogleLogin} from "@react-oauth/google";
import { GoogleOutlined } from '@ant-design/icons';

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const [loginByGoogle, { isLoading: isGoogleLoading }] = useLoginByGoogleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        if (!executeRecaptcha) return;

        const token = await executeRecaptcha('login');
        const payload : ILoginRequest = { ...values, recaptcha_token: token };

        try {
            const result = await login(payload).unwrap();
            console.log(result);
            dispatch(loginSuccess(result));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            try {
                const result = await loginByGoogle(tokenResponse.access_token).unwrap();
                dispatch(loginSuccess(result));
                navigate('/');
            } catch (err: any) {
                const errorMessage = err?.data?.errors?.Name?.[0];
                console.error(errorMessage);
            }
        },
    });

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "100%" }}
        >
            <Form.Item
                label="User name"
                name="username"
                rules={[
                    { required: true, message: "Please enter your email" }
                ]}
            >
                <Input placeholder="johnsmith" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Link to="/forgot-password">Forgot password?</Link>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    Login
                </Button>
            </Form.Item>

            <Button
                onClick={(event) => {
                    event.preventDefault();
                    loginUseGoogle();
                }}
                icon={<GoogleOutlined />}
                loading={isGoogleLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mt-4 flex items-center justify-center gap-2"
            >
                Login with Google
            </Button>
        </Form>
    );
};

export default LoginForm;