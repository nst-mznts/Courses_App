import { FC } from "react";

import Button from "../../../../common/Button/Button";

import "./AuthorItem.scss";

interface AuthorItemProps {
    authorId: string;
    authorName: string;
    actionType: "add" | "delete";
    onAdd?: (authorId: string) => void;
    onDelete?: (authorId: string) => void;
}

const AuthorItem: FC<AuthorItemProps> = ({
    authorId,
    authorName,
    actionType,
    onAdd,
    onDelete,
}) => (
    <li className="author-line flex--row">
        <p className="text--b1">{authorName}</p>
        {actionType === "add" && (
            <Button
                buttonText="+"
                buttonStyles="button round-button bordered"
                onClick={() => onAdd?.(authorId)}
            />
        )}
        {actionType === "delete" && (
            <Button
                buttonText="-"
                buttonStyles="button round-button bordered"
                onClick={() => onDelete?.(authorId)}
            />
        )}
    </li>
);

export default AuthorItem;
