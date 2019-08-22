import React from "react";

const CountryFlag = ({ flag, name }) => (
  <img src={flag} alt={name} height="300em" width="500em" border="1" />
);

export default CountryFlag;
