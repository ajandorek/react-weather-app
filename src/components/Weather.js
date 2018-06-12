import React from 'react';
import { renderWeatherImg } from '../utils/weather';

const Weather = props => {
  const {
    apiResponse, temperature, name, description, icon, unit,
  } = props;
  if (apiResponse === false) return <i className="loader wi wi-owm-01d" />;
  return (
    <div className="weather">
      <h1>Today's weather for {name}</h1>
      <h2>
        Currently: {temperature}° {unit}
      </h2>
      <h3 className="weather__capitalize">Current Weather: {description}</h3>
      <i className={`weather__icon ${renderWeatherImg(icon)}`} />
    </div>
  );
};

export default Weather;
