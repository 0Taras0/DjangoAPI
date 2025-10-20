import React from "react";
import BaseButton from "../../../components/buttons/BaseButton.tsx";

const SuccessPage: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
            <div
                className="bg-gradient-to-br from-purple-100 to-purple-300 dark:from-gray-900 dark:to-grey-800 rounded-2xl shadow-xl max-w-md w-full text-center p-8 transition-colors duration-300">
                <div className="text-green-500 text-6xl mb-4">✓</div>

                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    Вам надіслано лист!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Тепер ви можете змінити пароль.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <BaseButton
                        variant="primary"
                        size="lg"
                        href={"/login"}
                        className="w-full sm:w-auto font-semibold rounded-lg px-6 py-2"
                    >
                        Перейти до входу
                    </BaseButton>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;