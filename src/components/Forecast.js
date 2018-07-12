import React, { Component } from 'react';

import ForecastDay from './ForecastDay';

const FIVE_DAY_FORECAST = 5;
const THREE_DAY_FORECAST = 3;

export default class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      daysToRender: FIVE_DAY_FORECAST,
    };
  }

  handleClick() {
    const { daysToRender } = this.state;
    if (daysToRender === THREE_DAY_FORECAST) {
      this.setState({
        daysToRender: FIVE_DAY_FORECAST,
      });
    } else {
      this.setState({
        daysToRender: THREE_DAY_FORECAST,
      });
    }
  }

  renderForecast() {
    const { forecastData, currentUnit, type } = this.props;
    const { daysToRender } = this.state;
    return forecastData
      .slice(0, daysToRender)
      .map((day, i) => (
        <ForecastDay
          key={i}
          dayOfWeek={day.date}
          temperature={day.temperature}
          weather={day.weather}
          icon={day.icon}
          unit={currentUnit}
          type={type}
        />
      ));
  }

  render() {
    const { apiResponse } = this.props;
    const { daysToRender } = this.state;
    if (apiResponse === false) return <i className="loader wi wi-owm-01d" />;
    return (
      <div className="forecast">
        <button onClick={() => this.handleClick()} className="forecast__button">
          {`Showing ${daysToRender} Day`}
        </button>
        <div className="forecast__display">{this.renderForecast()}</div>
      </div>
    );
  }
}
