import React, { Component } from 'react';
import { unix } from 'moment';
import { renderWeatherImg, toCelcius, TEMP_CONSTS } from '../frontend/weather.js';

export default class ForecastDay extends Component {
  render() {
    const {
      dayOfWeek, temperature: value, weather, icon, unit, type,
    } = this.props;
    return (
      <div className="forecastday">
        <h1 className="forecastday__title">{unix(dayOfWeek).format('ddd')}</h1>
        <h3 className="forecastday__subtitle">
          {type === TEMP_CONSTS.FAHRENHEIT
            ? `${value}° ${unit}`
            : `${toCelcius(value).value}° ${unit} `}
        </h3>
        <p className="forecastday__subtitle">{weather}</p>
        <i className={`forecastday__icon ${renderWeatherImg(icon)}`} />
      </div>
    );
  }
}
