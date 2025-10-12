import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {ILoginResponse} from "../types/users/ILoginResponse.ts";
import {jwtDecode} from "jwt-decode";

interface User {
    id: number;
    username: string;
    email: string;
    image: string;
}

interface AuthState {
    user: User | null;
}

export const getUserFromToken = (token: string): User | null => {
    try {
        const decoded: any = jwtDecode(token);

        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            image: decoded.image
        };

    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
};

const token = localStorage.getItem('access_token');
const initialUser = token ? getUserFromToken(token) : null;

const initialState: AuthState = {
    user: initialUser,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<ILoginResponse>) => {

            const user = getUserFromToken(action.payload.access);
            if (user) {
                state.user = user;
                localStorage.setItem("access_token", action.payload.access);
                localStorage.setItem("refresh_token", action.payload.refresh);
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
