import { useState } from "react";

import { AuthorType } from "../store/authors/types";
import { useAppDispatch } from "../store/hooks";
import { addNewAuthor } from "../store/authors/thunk";

interface UseAuthorsProps {
    authorsList: AuthorType[];
    initialAuthorIds?: string[];
}

interface UseAuthorsReturn {
    authorName: string;
    allAuthors: AuthorType[];
    courseAuthors: AuthorType[];
    setAuthorName: React.Dispatch<React.SetStateAction<string>>;
    handleCreateAuthor: () => void;
    handleAddAuthor: (authorId: string) => void;
    handleDeleteAuthor: (authorId: string) => void;
    resetAuthors: () => void;
}

const useAuthors = ({
    authorsList,
    initialAuthorIds,
}: UseAuthorsProps): UseAuthorsReturn => {
    const initialCourseAuthors = initialAuthorIds
        ? authorsList.filter(author => initialAuthorIds.includes(author.id))
        : [];

    const initialAllAuthors = authorsList.filter(
        author => !initialAuthorIds?.includes(author.id)
    );
    const [authorName, setAuthorName] = useState<string>("");
    const [allAuthors, setAllAuthors] =
        useState<AuthorType[]>(initialAllAuthors);
    const [courseAuthors, setCourseAuthors] =
        useState<AuthorType[]>(initialCourseAuthors);

    const dispatch = useAppDispatch();

    const handleCreateAuthor = async () => {
        const name = authorName.trim();

        if (
            name.length >= 2 &&
            !authorsList.some(a => a.name.toLowerCase() === name.toLowerCase())
        ) {
            try {
                const createdAuthor = await dispatch(addNewAuthor({ name }));
                setAllAuthors(prev => [...prev, createdAuthor]);
            } catch (err) {
                console.error("Failed to add author", err);
            }
        }
        setAuthorName("");
    };

    const handleAddAuthor = (authorId: string) => {
        const author = allAuthors.find(a => a.id === authorId);
        if (author && !courseAuthors.some(a => a.id === authorId)) {
            setCourseAuthors([...courseAuthors, author]);
            setAllAuthors(allAuthors.filter(a => a.id !== authorId));
        }
    };

    const handleDeleteAuthor = (authorId: string) => {
        const author = courseAuthors.find(a => a.id === authorId);
        if (author) {
            setCourseAuthors(courseAuthors.filter(a => a.id !== authorId));
            setAllAuthors([...allAuthors, author]);
        }
    };

    const resetAuthors = () => {
        setAllAuthors(authorsList);
        setCourseAuthors([]);
        setAuthorName("");
    };

    return {
        authorName,
        allAuthors,
        courseAuthors,
        setAuthorName,
        handleCreateAuthor,
        handleAddAuthor,
        handleDeleteAuthor,
        resetAuthors,
    };
};

export default useAuthors;
