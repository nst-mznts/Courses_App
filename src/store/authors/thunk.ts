import { AppDispatch } from "../index.js";
import { AuthorType } from "./types.js";
import { fetchAuthorsSuccess, addAuthorAction } from "./actions.js";
import axios from "../../axios.js";

export const fetchAuthors =
    () =>
    async (dispatch: AppDispatch): Promise<AuthorType[]> => {
        try {
            const response = await axios.get("/authors/all");
            const authors: AuthorType[] = response.data.result;
            dispatch(fetchAuthorsSuccess(authors));
            return authors;
        } catch (error) {
            console.error("Failed to fetch authors:", error);
            return [];
        }
    };

export const addNewAuthor =
    (newAuthor: Omit<AuthorType, "id">) =>
    async (dispatch: AppDispatch): Promise<AuthorType> => {
        try {
            const response = await axios.post("/authors/add", newAuthor);

            if (!response.data.successful) {
                throw new Error("Author creation failed");
            }

            const createdAuthor: AuthorType = response.data.result;
            dispatch(addAuthorAction(createdAuthor));
            return createdAuthor;
        } catch (error) {
            console.error("Error creating author:", error);
            throw error;
        }
    };
