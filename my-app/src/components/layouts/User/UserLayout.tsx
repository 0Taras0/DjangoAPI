import {Link, Outlet, useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store"
import {logout} from "../../../store/authSlice.ts";
import {Button} from "antd";
import {APP_ENV} from "../../../env";

const UserLayout: React.FC = () => {
    const {user} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {

        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="w-full py-4 px-6 bg-blue-600 text-white shadow-md flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-xl font-semibold">ATB</h1>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/profile" className="flex items-center gap-2">
                                <img
                                    src={`${APP_ENV.API_BASE_URL}${user.image}`}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                />
                                <span className="font-medium">{user.username}</span>
                            </Link>

                            <Button
                                onClick={() => logoutHandler()}
                                className="bg-white text-orange-500 border-none hover:bg-orange-100"
                            >
                                Вихід
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="login"
                                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
                            >
                                Вхід
                            </Link>

                            <Link
                                to="register"
                                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6 bg-[rgb(245,245,245)]">
                <Outlet/>
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center text-gray-500">
                © 2025 ATB. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;