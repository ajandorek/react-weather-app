import React, { Component } from 'react';

import ForecastDay from './ForecastDay';

export default class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      threeDay: true,
    };
  }

  handleClick() {
    this.setState({
      threeDay: !this.state.threeDay,
    });
  }

  renderForecast() {
    const { forecastData, isCelcius } = this.props;
    if (this.state.threeDay) {
      return forecastData.list
        .slice(0, 3)
        .map((day, i) => <ForecastDay key={i} weather={day} isCelcius={isCelcius} />);
    }
    return forecastData.list.map((day, i) => (
      <ForecastDay key={i} weather={day} isCelcius={isCelcius} />
    ));
  }

  render() {
    const { apiResponse } = this.props;
    const { threeDay } = this.state;
    if (apiResponse === false) return <div>Loading</div>;
    return (
      <div>
        <button onClick={() => this.handleClick()}>{threeDay ? 'Show 5 Day' : 'Show 3 Day'}</button>
        <div className="forecast">{this.renderForecast()}</div>
      </div>
    );
  }
}
