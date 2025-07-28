import {
    UserActionTypes,
    UserType,
    LoginAction,
    RemoveUser,
    FetchCurrentUserAction,
} from "./types.js";

export const loginAction = (userData: UserType): LoginAction => ({
    type: UserActionTypes.LOGIN,
    payload: userData,
});

export const logoutAction = (): RemoveUser => ({
    type: UserActionTypes.REMOVE_USER,
    payload: {
        isAuth: false,
        name: "",
        email: "",
        token: "",
        role: "",
    },
});

export const fetchCurrentUserSuccess = (
    userData: UserType
): FetchCurrentUserAction => ({
    type: UserActionTypes.FETCH_CURRENT_USER,
    payload: userData,
});
