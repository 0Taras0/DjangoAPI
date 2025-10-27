import { Link, Outlet } from "react-router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../../store";
import { ThemeToggleButton } from "../../components/bars/ThemeToggleButton.tsx";
import TopicsSidebar from "../../components/bars/TopicsSideBar.tsx";
import UserDropdown from "../../components/dropdown/UserDropdown.tsx";
import BaseButton from "../../components/buttons/BaseButton.tsx";

const UserLayout: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
            {/* --- HEADER --- */}
            <header className="fixed top-0 left-0 right-0 z-20 h-14 px-6 bg-gray-50 dark:bg-gray-900 shadow-md flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <div className="hidden items-center gap-1 lg:flex">
                    <FontAwesomeIcon className="text-4xl text-purple-500 dark:text-purple-400" icon={faReddit} />
                    <Link to="/" className="text-2xl font-semibold font-['Comic_Sans_MS'] text-gray-900 dark:text-white">
                        reddka
                    </Link>
                </div>

                <ThemeToggleButton />

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <BaseButton variant="ghost" href="/posts/create">
                                Добавити пост
                            </BaseButton>
                            <UserDropdown />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-purple-500 dark:bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-600 dark:hover:bg-purple-700 transition text-white"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-600 dark:bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition text-white"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <div className="flex flex-1 pt-14">
                <aside className="hidden lg:block sticky top-14 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
                    <TopicsSidebar />
                </aside>

                <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>

            <footer className="w-full py-3 px-6 text-sm text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                © 2025 Reddka. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;