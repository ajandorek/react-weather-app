import React, { Component } from 'react';

import ForecastDay from './ForecastDay';

export default class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      daysToRender: 5,
    };
  }

  handleClick() {
    const { daysToRender } = this.state;
    if (daysToRender === 3) {
      this.setState({
        daysToRender: 5,
      });
    } else {
      this.setState({
        daysToRender: 3,
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
