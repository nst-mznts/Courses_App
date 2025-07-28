import { useState } from "react";

interface UseSearchReturn {
    searchInput: string;
    filterText: string;
    handleSearch: () => void;
    handleSearchInput: (value: string) => void;
}

const useSearch = (): UseSearchReturn => {
    const [searchInput, setSearchInput] = useState("");
    const [filterText, setFilterText] = useState("");

    const handleSearch = () => {
        setFilterText(searchInput);
    };

    const handleSearchInput = (value: string) => {
        setSearchInput(value);
    };

    return {
        searchInput,
        filterText,
        handleSearch,
        handleSearchInput,
    };
};

export default useSearch;
