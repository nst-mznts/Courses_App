import { UserActionTypes, UserType, UsersAction } from "./types.js";

export const userInitialState: UserType = {
    isAuth: false,
    name: "",
    email: "",
    token: "",
    role: "",
};

export function userReducer(
    state = userInitialState,
    action: UsersAction
): UserType {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            };
        case UserActionTypes.ADD_USER:
            return { ...state, ...action.payload };
        case UserActionTypes.REMOVE_USER:
            return userInitialState;
        case UserActionTypes.FETCH_CURRENT_USER:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            };
        default:
            return state;
    }
}
