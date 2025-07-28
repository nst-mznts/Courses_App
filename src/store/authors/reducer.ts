import { AuthorsActionTypes, AuthorType, AuthorsAction } from "./types.js";

export const initAuthorsState = [] as AuthorType[];

export function AuthorsReducer(
    state = initAuthorsState,
    action: AuthorsAction
): AuthorType[] {
    switch (action.type) {
        case AuthorsActionTypes.FETCH_AUTHORS:
            return action.payload;
        case AuthorsActionTypes.ADD_AUTHOR:
            return [...state, action.payload];
        default:
            return state;
    }
}
