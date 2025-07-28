import { FC } from "react";

import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";
import { BUTTON_TEXT } from "../../constants";

import "./Header.scss";

interface HeaderProps {
    username: string;
    isAuth: boolean;
    onClick: () => void;
}

const Header: FC<HeaderProps> = ({ username, isAuth, onClick }) => {
    return (
        <header>
            <div className="wrapper flex--row header--wrapper">
                <Logo />
                <div className="header-username-wrapper flex--row">
                    <h4 className="text--b2 username-color">{username}</h4>
                    {isAuth && (
                        <Button
                            buttonText={BUTTON_TEXT.LOGOUT}
                            type="link"
                            to="/login"
                            onClick={onClick}
                            buttonStyles="button rectangular-button bordered"
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
