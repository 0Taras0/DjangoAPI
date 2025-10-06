import "./App.css";
import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/loadings/LoadingScreen.tsx";

const UsersListPage = lazy(() => import("./pages/users/UsersListPage/UsersListPage.tsx"));
const UserRegisterPage = lazy(() => import("./pages/users/UserRegisterPage/UserRegisterPage.tsx"));

function App() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path="/">
                    <Route index element={<UsersListPage />} />
                    <Route path="register" element={<UserRegisterPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;