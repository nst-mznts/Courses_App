export const enum UserActionTypes {
    ADD_USER = "ADD_USER",
    LOGIN = "LOGIN",
    REMOVE_USER = "REMOVE_USER",
    FETCH_CURRENT_USER = "FETCH_CURRENT_USER",
}

export type UserType = {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
    role: string;
};

export interface LoginAction {
    type: UserActionTypes.LOGIN;
    payload: UserType;
}

export interface AddUser {
    type: UserActionTypes.ADD_USER;
    payload: UserType;
}

export interface RemoveUser {
    type: UserActionTypes.REMOVE_USER;
    payload: UserType;
}

export interface FetchCurrentUserAction {
    type: UserActionTypes.FETCH_CURRENT_USER;
    payload: UserType;
}

export type UsersAction =
    | LoginAction
    | AddUser
    | RemoveUser
    | FetchCurrentUserAction;
