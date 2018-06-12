import React, { Component } from 'react';
import { unix } from 'moment';
import { renderWeatherImg, toCelcius, TEMP_CONSTS } from '../utils/weather.js';

export default class ForecastDay extends Component {
  render() {
    const {
      dayOfWeek, temperature: value, weather, icon, unit, type,
    } = this.props;
    return (
      <div className="forecastday">
        <h2>{unix(dayOfWeek).format('ddd')}</h2>
        <h3>
          {type === TEMP_CONSTS.FAHRENHEIT
            ? `${value}° ${unit}`
            : `${toCelcius({ value, type }).value}° ${unit} `}
        </h3>
        <p>{weather}</p>
        <i className={renderWeatherImg(icon)} />
      </div>
    );
  }
}
