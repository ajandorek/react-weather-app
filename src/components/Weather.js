import React, { Component } from 'react';
import { currentWeather } from '../utils/weather';

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      apiResponse: false,
      temperature: null,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    currentWeather().then(res =>
      this.setState({
        weatherData: res.data,
        apiResponse: true,
        temperature: res.data.main.temp,
      }));
  }

  render() {
    const { apiResponse } = this.state;
    if (apiResponse === false) return <div>Loading</div>;
    return (
      <div>
        <h1>Today's weather for {this.state.weatherData.name}</h1>
        <h2>{this.state.temperature}</h2>
      </div>
    );
  }
}
