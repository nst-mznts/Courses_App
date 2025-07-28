import { FC } from "react";

import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";
import { BUTTON_TEXT } from "../../../../constants";

import "./SearchBar.scss";

interface SearchBarProps {
    handleSearchInput: (value: string) => void;
    handleSearch: () => void;
    searchInput: string;
}

const SearchBar: FC<SearchBarProps> = ({
    handleSearchInput,
    handleSearch,
    searchInput,
}) => {
    return (
        <div className="search flex--row">
            <Input
                placeholderText="Search"
                value={searchInput}
                onChange={event => handleSearchInput(event.target.value)}
            />
            <Button
                buttonText={BUTTON_TEXT.SEARCH}
                onClick={handleSearch}
                buttonStyles="button rectangular-button colored"
            />
        </div>
    );
};

export default SearchBar;
