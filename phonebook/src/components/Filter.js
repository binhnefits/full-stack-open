import React from "react";

const Filter = ({ setFilter }) => {
  const handleFilter = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      filter: <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
