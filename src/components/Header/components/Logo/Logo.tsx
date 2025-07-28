import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "../../../../assets/logo.svg";

import "./Logo.scss";

const Logo: FC = () => (
    <Link to="/courses">
        <img className="logo" src={logo} alt="logo" />
    </Link>
);

export default Logo;
