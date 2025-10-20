import "./App.css";
import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/loadings/LoadingScreen.tsx";

const NotFoundPage = lazy(() => import("./pages/additional/NotFoundPage.tsx"))
const ForgotPasswordPage = lazy(() => import("./pages/users/UserResetPasswordPage/ForgotPasswordPage.tsx"));
const ResetPasswordPage = lazy(() => import("./pages/users/UserResetPasswordPage/ResetPasswordPage.tsx"));
const SuccessPage = lazy(() => import("./pages/users/UserResetPasswordPage/SuccessPage.tsx"));
const UserLoginPage = lazy(() => import("./pages/users/UserLoginPage/UserLoginPage.tsx"));
const UsersListPage = lazy(() => import("./pages/users/UsersListPage/UsersListPage.tsx"));
const UserRegisterPage = lazy(() => import("./pages/users/UserRegisterPage/UserRegisterPage.tsx"));
const UserLayout = lazy(() => import("./layouts/User/UserLayout.tsx"));

function App() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<UsersListPage />}/>
                    <Route path={"register"} element={<UserRegisterPage />}/>
                    <Route path={"login"} element={<UserLoginPage />}/>
                    <Route path={"forgot-password"} element={<ForgotPasswordPage />} />
                    <Route path="reset-password/:uid/:token" element={<ResetPasswordPage />} />
                    <Route path={"success-confirm"} element={<SuccessPage />} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;