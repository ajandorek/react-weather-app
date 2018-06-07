import React from 'react';
import moment from 'moment';
import { renderWeatherImg, toCelcius } from '../utils/weather.js';

const ForecastDay = props => (
  <div className="forecastday">
    <h2>{moment.unix(props.weather.dt).format('ddd')}</h2>
    <h3>
      {props.isCelcius ? `${toCelcius(props.weather.temp.day)}° C` : `${props.weather.temp.day}° F`}
    </h3>
    <i className={renderWeatherImg(props.weather.weather[0].icon)} />
  </div>
);

export default ForecastDay;
