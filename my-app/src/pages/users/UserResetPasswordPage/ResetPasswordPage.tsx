import React from "react";
import ResetPasswordForm from "../../../components/forms/users/ResetPasswordForm.tsx";

const ResetPasswordPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-5">
            <div className="max-w-[900px] w-full rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="text-center mb-6 p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                        Reset Password
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Enter your new password
                    </p>
                </div>

                <div className="px-6 pb-6">
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;