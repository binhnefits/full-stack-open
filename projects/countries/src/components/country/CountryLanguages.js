import React from "react";

const CountryLanguages = ({ languages }) => {
  const displayLanguages = () =>
    languages.map((language, index) => <li key={index}>{language.name}</li>);

  return <ul>{displayLanguages()}</ul>;
};

export default CountryLanguages;
