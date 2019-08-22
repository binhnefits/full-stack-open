import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import CountryDisplay from "./country/CountriesDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const filterCountries = () =>
    searchedCountry === ""
      ? []
      : countries.filter(country =>
          country.name
            .toLocaleLowerCase()
            .includes(searchedCountry.toLocaleLowerCase())
        );

  return (
    <div>
      find countries <Search setSearchedCountry={setSearchedCountry} />
      <CountryDisplay countries={filterCountries()} />
    </div>
  );
};

export default App;
