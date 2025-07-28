import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

interface ButtonProps {
    buttonText?: string;
    icon?: ReactNode;
    to?: string;
    type?: "button" | "link";
    buttonType?: "button" | "submit";
    buttonStyles?: string;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
    buttonText,
    icon,
    to,
    type = "button",
    buttonType,
    buttonStyles = "button",
    onClick,
}) => {
    if (type === "link" && to) {
        return (
            <Link to={to} className={buttonStyles} onClick={onClick}>
                {icon}
                {buttonText}
            </Link>
        );
    }

    return (
        <button
            className={buttonStyles}
            type={buttonType ? buttonType : "button"}
            onClick={onClick}
        >
            {icon}
            {buttonText}
        </button>
    );
};

export default Button;
