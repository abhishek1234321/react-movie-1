import React, { useState } from 'react';

import './Search.css';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }
  const resetInputField = () => {
    setSearchValue('');
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="Search">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChanges}
      />
      <input onClick={callSearchFunction} type="submit" value="Search" />
    </form>
  );
}

export default Search;