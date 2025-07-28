import { AppDispatch } from "../index.js";
import { UserType } from "./types.js";
import {
    loginAction,
    fetchCurrentUserSuccess,
    logoutAction,
} from "./actions.js";
import axios from "../../axios.js";

export const registerUser =
    (credentials: { name: string; email: string; password: string }) =>
    async (): Promise<void> => {
        try {
            const response = await axios.post("/register", credentials);
            if (response.status === 201 && response.data.successful) {
                return;
            } else {
                console.error("Registration failed:", response.data);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

export const loginUser =
    (credentials: { email: string; password: string }) =>
    async (dispatch: AppDispatch): Promise<UserType> => {
        try {
            const response = await axios.post("/login", credentials);
            if (response.status === 201 && response.data.successful) {
                const token = response.data.result;
                const userData: UserType = {
                    isAuth: true,
                    name: response.data.user.name || response.data.user.role,
                    email: response.data.user.email,
                    token: token,
                    role: response.data.user.role,
                };
                localStorage.setItem("token", token);
                dispatch(loginAction(userData));
                return userData;
            } else {
                throw new Error("Login failed. Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

export const fetchCurrentUser =
    () =>
    async (dispatch: AppDispatch): Promise<UserType> => {
        try {
            const response = await axios.get("/users/me");
            if (response.status === 200 && response.data.successful) {
                const userData: UserType = {
                    isAuth: true,
                    name:
                        response.data.result.name || response.data.result.role,
                    email: response.data.result.email,
                    token: localStorage.getItem("token") || "",
                    role: response.data.result.role,
                };
                dispatch(fetchCurrentUserSuccess(userData));
                return userData;
            } else {
                throw new Error("Failed to fetch current user");
            }
        } catch (error) {
            console.error("Failed to fetch current user", error);
            throw error;
        }
    };

export const logoutUser =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await axios.delete("/logout");
        } catch (error) {
            console.error("Failed to logout:", error);
        } finally {
            dispatch(logoutAction());
            localStorage.removeItem("token");
        }
    };
