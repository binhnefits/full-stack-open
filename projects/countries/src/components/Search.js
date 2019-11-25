import React from "react";

const Search = ({ setSearchedCountry }) => {
  const handleSearchCountries = event => {
    setSearchedCountry(event.target.value);
  };

  return <input onChange={handleSearchCountries} />;
};

export default Search;
