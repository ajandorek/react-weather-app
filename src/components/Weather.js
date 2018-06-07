import React, { Component } from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
import '../../node_modules/weather-icons-lite/css/weather-icons-lite.min.css';
import { currentWeather, toCelcius, renderWeatherImg, getLocation } from '../utils/weather';

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      apiResponse: false,
      temperature: null,
      isCelcius: false,
      location: false,
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      getLocation().then(res => {
        this.setState({
          location: true,
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
        this.getWeather(this.state.latitude, this.state.longitude);
      });
    }
  }

  getWeather() {
    currentWeather(this.state.latitude, this.state.longitude).then(res => {
      if (this.state.location) {
        this.setState({
          weatherData: res.data,
          apiResponse: true,
          temperature: res.data.main.temp,
        });
      }
    });
  }

  render() {
    const { apiResponse, weatherData } = this.state;
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
        <h3>Current Weather: {weatherData.weather[0].description}</h3>
        <i className={renderWeatherImg(weatherData.weather[0].icon)} />
      </div>
    );
  }
}
