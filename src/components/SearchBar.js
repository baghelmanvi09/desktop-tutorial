import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  return <input type="text" placeholder="Search Hacker News" onKeyDown={handleSearch} />;
};

export default SearchBar;