import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-md">
      <AiOutlineSearch className="text-gray-500 ml-2" />
      <input
        type="text"
        className="flex-grow p-2 rounded-full focus:outline-none"
        placeholder="Search for songs..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
