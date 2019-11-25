import React from "react";
import Country from "./Country";
import CountryFlag from "./CountryFlag";
import CountryLanguages from "./CountryLanguages";

const CountryDisplay = ({ countries }) => {
  const displayCountries = () =>
    countries.length === 0 ? (
      ""
    ) : countries.length === 1 ? (
      <>
        <h2>{countries[0].name}</h2>
        <CountryFlag flag={countries[0].flag} name={countries[0].name} />
        <CountryLanguages languages={countries[0].languages} />
      </>
    ) : countries.length < 10 ? (
      countries.map(country => (
        <Country
          key={country.numericCode}
          name={country.name}
          flag={country.flag}
          languages={country.languages}
          city={country.capital}
        />
      ))
    ) : (
      "Too many matches, specify another filter"
    );

  return <div>{displayCountries()}</div>;
};

export default CountryDisplay;
