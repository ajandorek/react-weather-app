import React from 'react';
import { toCelcius, renderWeatherImg } from '../utils/weather';

const Weather = props => {
  const {
    apiResponse, weatherData, temperature, isCelcius,
  } = props;
  if (apiResponse === false) return <div>Loading</div>;

  const { name } = weatherData;
  const { description, icon } = props.weatherData.weather[0];
  return (
    <div>
      <h1>Today's weather for {name}</h1>
      <h2>{isCelcius ? `${toCelcius(temperature)}° C` : `${temperature}° F`}</h2>
      <h3 className="weather__capitalize">Current Weather: {description}</h3>
      <i className={renderWeatherImg(icon)} />
    </div>
  );
};

export default Weather;
