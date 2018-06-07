import React from 'react';
import { toCelcius, renderWeatherImg } from '../utils/weather';

const Weather = props => {
  const { apiResponse, weatherData, temperature } = props;
  if (apiResponse === false) return <div>Loading</div>;
  return (
    <div>
      <h1>Today's weather for {weatherData.name}</h1>
      <h2>{props.isCelcius ? `${toCelcius(temperature)}° C` : `${temperature}° F`}</h2>
      <h3>Current Weather: {weatherData.weather[0].description}</h3>
      <i className={renderWeatherImg(weatherData.weather[0].icon)} />
    </div>
  );
};

export default Weather;
