export const enum AuthorsActionTypes {
    FETCH_AUTHORS = "FETCH_AUTHORS",
    ADD_AUTHOR = "ADD_AUTHOR",
}

export type AuthorType = {
    id: string;
    name: string;
};

export interface FetchAuthors {
    type: AuthorsActionTypes.FETCH_AUTHORS;
    payload: AuthorType[];
}

export interface AddAuthor {
    type: AuthorsActionTypes.ADD_AUTHOR;
    payload: AuthorType;
}

export type AuthorsAction = FetchAuthors | AddAuthor;
