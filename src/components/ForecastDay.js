import React from 'react';
import moment from 'moment';
import { renderWeatherImg, toCelcius } from '../utils/weather.js';

const ForecastDay = props => {
  const { weather, isCelcius } = props;
  return (
    <div className="forecastday">
      <h2>{moment.unix(weather.dt).format('ddd')}</h2>
      <h3>{isCelcius ? `${toCelcius(weather.temp.day)}° C` : `${weather.temp.day}° F`}</h3>
      <p>{weather.weather[0].main}</p>
      <i className={renderWeatherImg(weather.weather[0].icon)} />
    </div>
  );
};

export default ForecastDay;
