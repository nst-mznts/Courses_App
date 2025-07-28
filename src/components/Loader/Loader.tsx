import { FC } from "react";

import "./Loader.scss";

const Loader: FC = () => (
    <main>
        <div className="wrapper flex--column main--wrapper">
            <div className="loader">
                <span className="loader-text title--h4">Loading...</span>
                <span className="load"></span>
            </div>
        </div>
    </main>
);

export default Loader;
