import React, { Component } from 'react';
import { unix } from 'moment';
import { renderWeatherImg } from '../utils/weather.js';

export default class ForecastDay extends Component {
  render() {
    const {
      dayOfWeek, temperature, weather, icon, unit, type,
    } = this.props;
    return (
      <div className="forecastday">
        <h2>{unix(dayOfWeek).format('ddd')}</h2>
        <h3>
          {type === 'CELCIUS'
            ? `${((temperature - 32) / 1.8).toFixed(2)}° ${unit}`
            : `${temperature}° ${unit}`}
        </h3>
        <p>{weather}</p>
        <i className={renderWeatherImg(icon)} />
      </div>
    );
  }
}
