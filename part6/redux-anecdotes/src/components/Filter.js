import React from "react";
import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = props => {
  const handleChange = event => {
    event.preventDefault();
    const keyword = event.target.value;
    props.setFilter(keyword);
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

const mapDispatchToProps = {
  setFilter
};

export default connect(null, mapDispatchToProps)(Filter);
