import React from "react";
import ResetPasswordRequestForm from "../../../components/forms/users/ResetPasswordRequestForm.tsx";

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="p-[20px] min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-[900px] w-full rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-purple-500 px-[60px] py-[40px] hidden md:flex flex-col justify-center items-center">
                        <span className="text-4xl font-semibold text-white">
                            Need Help?
                        </span>
                        <p className="text-white/80 mt-2 text-center">
                            We’ll send you a link to reset your password
                        </p>
                    </div>

                    <div className="p-[40px]">
                        <div className="text-center mb-[24px]">
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Forgot Password?
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Enter your email to reset your password
                            </p>
                        </div>

                        <ResetPasswordRequestForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;