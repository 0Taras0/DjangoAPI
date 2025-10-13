import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginResponse } from "../types/users/ILoginResponse";
import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface User {
    id: number;
    username: string;
    email: string;
    image: string;
}

interface AuthState {
    user: User | null;
}

interface DecodedToken {
    token_type: "access" | "refresh";
    exp: number;
    iat: number;
    jti: string;
    user_id: string;
    id: number;
    username: string;
    email: string;
    image: string;
    date_joined: string;
}

export const getUserFromToken = (token: string): User | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);

        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            image: decoded.image,
        };
    } catch {
        return null;
    }
};

const token = getCookie("access_token") as string | undefined;
const initialUser = token ? getUserFromToken(token) : null;

const initialState: AuthState = {
    user: initialUser,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<ILoginResponse>) => {
            const { access, refresh } = action.payload;
            const user = getUserFromToken(access);
            if (user) {
                state.user = user;
                setCookie("access_token", access);
                setCookie("refresh_token", refresh);
            }
        },
        logout: (state) => {
            state.user = null;
            deleteCookie("access_token");
            deleteCookie("refresh_token");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;