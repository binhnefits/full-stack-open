import React from "react";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ store }) => {
  const handleChange = event => {
    event.preventDefault();
    const keyword = event.target.value;
    store.dispatch(setFilter(keyword));
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
