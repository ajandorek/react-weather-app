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
    const { forecastData, currentUnit, currentType } = this.props;
    const { daysToRender } = this.state;
    return forecastData
      .slice(0, daysToRender)
      .map((day, i) => (
        <ForecastDay
          key={i}
          dayOfWeek={day.dt}
          temperature={day.temp.day}
          weather={day.weather[0].main}
          icon={day.weather[0].icon}
          unit={currentUnit}
          type={currentType}
        />
      ));
  }

  render() {
    const { apiResponse } = this.props;
    const { daysToRender } = this.state;
    if (apiResponse === false) return <div>Loading</div>;
    return (
      <div>
        <button onClick={() => this.handleClick()}>
          {daysToRender === 5 ? 'Show 5 Day' : 'Show 3 Day'}
        </button>
        <div className="forecast">{this.renderForecast()}</div>
      </div>
    );
  }
}
