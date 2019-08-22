import React, { useState } from "react";
import CountryFlag from "./CountryFlag";
import CountryLanguages from "./CountryLanguages";
import CountryWeather from "./CountryWeather";

const Country = ({ name, flag, languages, city }) => {
  const [show, setShow] = useState(false);

  const displayInfo = () =>
    show ? (
      <div>
        <CountryFlag flag={flag} name={name} />
        <CountryLanguages languages={languages} />
        <CountryWeather city={city} />
      </div>
    ) : (
      ""
    );

  return (
    <div>
      {`${name} `}
      <button onClick={() => setShow(!show)}>{show ? "close" : "show"}</button>
      {displayInfo()}
    </div>
  );
};

export default Country;
