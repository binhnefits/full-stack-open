import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryWeather = ({ city }) => {
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const api_uri = `http://api.apixu.com/v1/current.json?key=7e1c17c0e2f8438eb5543259192208&q=${city}`;

  useEffect(() => {
    axios.get(api_uri).then(response => {
      setWeather(response.data.current);
      setWeatherIcon(response.data.current.condition.icon);
    });
  }, [api_uri]);

  return (
    <>
      <p>{`Weather in ${city} C`}</p>
      <img src={weatherIcon} alt="icon" />
      <p>{`temperature: ${weather.temp_c}`}</p>
      <p>{`wind: ${weather.wind_mph} mph ${weather.wind_dir}`}</p>
    </>
  );
};

export default CountryWeather;
