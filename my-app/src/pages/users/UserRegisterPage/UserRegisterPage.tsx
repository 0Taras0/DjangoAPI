import React from "react";
import RegisterForm from "../../../components/forms/RegisterForm.tsx"

const UserRegisterPage: React.FC = () => {
    return (
        <div className="p-[20px] min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-[900px] w-full rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-2">
                    <div className="bg-purple-500 px-[60px] py-[40px]">
                        <span className="text-4xl text-white">
                            Welcome!
                        </span>
                        <p>
                            Create your account to get started.
                        </p>
                    </div>

                    <div className="p-[40px]">
                        <div className="text-center mb-[24px]">
                            <p className="text-3xl font-bold">Register</p>
                            <p>Enter your information to register</p>
                        </div>

                        <RegisterForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegisterPage;