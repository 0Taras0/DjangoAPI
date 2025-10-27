import "./App.css";
import {Navigate, Route, Routes} from "react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/loadings/LoadingScreen.tsx";

const NotFoundPage = lazy(() => import("./pages/additional/NotFoundPage.tsx"))
const ForgotPasswordPage = lazy(() => import("./pages/users/UserResetPasswordPage/ForgotPasswordPage.tsx"));
const ResetPasswordPage = lazy(() => import("./pages/users/UserResetPasswordPage/ResetPasswordPage.tsx"));
const SuccessPage = lazy(() => import("./pages/users/UserResetPasswordPage/SuccessPage.tsx"));
const UserLoginPage = lazy(() => import("./pages/users/UserLoginPage/UserLoginPage.tsx"));
const UserRegisterPage = lazy(() => import("./pages/users/UserRegisterPage/UserRegisterPage.tsx"));
const UserLayout = lazy(() => import("./layouts/User/UserLayout.tsx"));
const PostCreatePage = lazy(() => import("./pages/posts/PostCreatePage/PostCreatePage.tsx"));
const PostListPage = lazy(() => import("./pages/posts/PostListPage/PostListPage.tsx"));

function App() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Navigate to="/posts" replace />} />

                    <Route path="register" element={<UserRegisterPage />} />
                    <Route path="login" element={<UserLoginPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="reset-password/:uid/:token" element={<ResetPasswordPage />} />
                    <Route path="success-confirm" element={<SuccessPage />} />

                    <Route path="posts">
                        <Route index element={<PostListPage />} />
                        <Route path="create" element={<PostCreatePage />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;