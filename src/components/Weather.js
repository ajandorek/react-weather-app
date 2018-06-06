import React, { Component } from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
import { currentWeather, toCelcius } from '../utils/weather';

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      apiResponse: false,
      temperature: null,
      isCelcius: false,
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
        <div>
          F
          <ToggleSwitch
            size="sm"
            checked={this.state.isCelcius}
            onChange={() => {
              this.setState({ isCelcius: !this.state.isCelcius });
            }}
          />
          C
        </div>
        <h2>
          {this.state.isCelcius
            ? `${toCelcius(this.state.temperature)}° C`
            : `${this.state.temperature}° F`}
        </h2>
      </div>
    );
  }
}
