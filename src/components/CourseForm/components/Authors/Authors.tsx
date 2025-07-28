import { FC } from "react";

import Input from "../../../../common/Input/Input";
import Button from "../../../../common/Button/Button";
import AuthorItem from "../AuthorItem/AuthorItem";
import { BUTTON_TEXT } from "../../../../constants";
import { AuthorType } from "../../../../store/authors/types";

interface AuthorsProps {
    courseAuthors: AuthorType[];
    allAuthors: AuthorType[];
    authorName: string;
    onChange: (value: string) => void;
    onAdd: (authorId: string) => void;
    onDelete: (authorId: string) => void;
    onCreate: () => void;
}

const Authors: FC<AuthorsProps> = ({
    courseAuthors,
    allAuthors,
    authorName,
    onChange,
    onAdd,
    onDelete,
    onCreate,
}) => (
    <>
        <div className="author flex--row width100">
            <div className="form-section--half flex--column">
                <h4 className="title--h4">Authors</h4>
                <div className="section-line flex--row">
                    <Input
                        labelText="author name"
                        placeholderText="Enter Author name"
                        value={authorName}
                        onChange={e => onChange(e.target.value)}
                    >
                        <Button
                            buttonText={BUTTON_TEXT.CREATE_AUTHOR}
                            onClick={onCreate}
                            buttonStyles="button rectangular-button colored large"
                        />
                    </Input>
                </div>
            </div>
            <div className="authors-section flex--column">
                <h4 className="title--h4">Course Authors</h4>
                {courseAuthors.length === 0 ? (
                    <p>Course author list is empty</p>
                ) : (
                    <ul className="section-line flex--column">
                        {courseAuthors.map(author => (
                            <AuthorItem
                                key={author.id}
                                authorId={author.id}
                                authorName={author.name}
                                onDelete={onDelete}
                                actionType="delete"
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <div className="form-section--half flex--column">
            <h4 className="title--h4">Author List</h4>
            {allAuthors.length === 0 ? (
                <p>Author list is empty</p>
            ) : (
                <ul className="section-line flex--column">
                    {allAuthors.map(author => (
                        <AuthorItem
                            key={author.id}
                            authorId={author.id}
                            authorName={author.name}
                            onAdd={onAdd}
                            actionType="add"
                        />
                    ))}
                </ul>
            )}
            <div className="section-line flex--column"></div>
        </div>
    </>
);

export default Authors;
