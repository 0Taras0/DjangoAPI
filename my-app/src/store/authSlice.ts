import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { ILoginResponse } from "../types/users/ILoginResponse";
import {deleteCookie, getCookie, setCookie} from "cookies-next";

export interface User {
    id: number;
    username: string;
    email: string;
    image?: string | null;
    date_joined?: string;
}

interface AuthState {
    access: string | null;
    refresh: string | null;
    user: User | null;
}

const getUserFromToken = (token: string): User | null => {
    try {
        const decoded: any = jwtDecode(token);
        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            image: decoded.image ?? null,
            date_joined: decoded.date_joined ?? null,
        };
    } catch (error) {
        console.error("Invalid JWT:", error);
        return null;
    }
};

const access = getCookie("access_token") as string;
const refresh = getCookie("refresh_token") as string;

const initialState: AuthState = {
    access,
    refresh,
    user: access ? getUserFromToken(access) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<ILoginResponse>) => {
            const { access, refresh } = action.payload;
            state.access = access;
            state.refresh = refresh;

            setCookie("access_token", access);
            setCookie("refresh_token", refresh);

            state.user = getUserFromToken(access);
        },
        clearTokens: (state) => {
            state.access = null;
            state.refresh = null;
            state.user = null;

            deleteCookie("access_token");
            deleteCookie("refresh_token");
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.access = action.payload;
            setCookie("access_token", action.payload);
            state.user = getUserFromToken(action.payload);
        },
    },
});

export const { setTokens, clearTokens, updateAccessToken } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.access;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refresh;

export default authSlice.reducer;
