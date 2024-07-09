import { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({value, onSearchChange, onImmediateChange}) {
    const searchDebouncedRef = useRef(null);

    const handleSearchChange = (e) => { 
        const searchValue = e.target.value;

        // Update the searchTerm immediately
        onImmediateChange(searchValue);

        // Clear the existing timeout if it exists
        if (searchDebouncedRef.current) {
            clearTimeout(searchDebouncedRef.current);
        }

        //Set a new timeout
        searchDebouncedRef.current = setTimeout(() => {
            onSearchChange(searchValue);
         }, 500);


    }

    return (
        <div>
        <input 
            type="text"
            placeholder="Search..."
            value={value}
            onChange={handleSearchChange} />
        </div>
    )

}


SearchBar.propTypes = {
    value: PropTypes.string,
    onSearchChange: PropTypes.func,
    onImmediateChange: PropTypes.func,
}

export default SearchBar;