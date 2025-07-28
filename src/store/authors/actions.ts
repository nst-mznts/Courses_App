import {
    AuthorsActionTypes,
    AuthorType,
    FetchAuthors,
    AddAuthor,
} from "./types.js";

export const fetchAuthorsSuccess = (authors: AuthorType[]): FetchAuthors => ({
    type: AuthorsActionTypes.FETCH_AUTHORS,
    payload: authors,
});

export const addAuthorAction = (newAuthor: AuthorType): AddAuthor => ({
    type: AuthorsActionTypes.ADD_AUTHOR,
    payload: newAuthor,
});
