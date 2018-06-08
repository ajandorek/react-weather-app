import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getWeatherInformation } from '../utils/weather';
import getLocation from '../utils/location';

import AirQuality from './AirQuality';
import Forecast from './Forecast';
import Nav from './Nav';
import UnitToggle from './UnitToggle';
import Weather from './Weather';
/* eslint-disable react/no-unused-state */
class App extends Component {
  constructor() {
    super();
    this.state = {
      isCelcius: false,
      location: false,
      latitude: null,
      longitude: null,
      weatherData: null,
      forecastData: null,
      forecastResponse: false,
      weatherResponse: false,
      temperature: null,
    };

    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      getLocation().then(response => {
        this.setState({
          location: true,
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        });
        this.getCurrentWeather();
        this.getCurrentForecast();
      });
    }
  }

  getCurrentWeather() {
    const { latitude, longitude, location } = this.state;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OPENWEATHER_APIKEY
    }&units=imperial`;
    if (location) {
      getWeatherInformation(url, latitude, longitude).then(response => {
        this.setState({
          weatherData: response.data,
          weatherResponse: true,
          temperature: response.data.main.temp,
        });
      });
    }
  }

  getCurrentForecast() {
    const { latitude, longitude, location } = this.state;
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${
      process.env.OPENWEATHER_APIKEY
    }&cnt=5&units=imperial`;
    if (location) {
      getWeatherInformation(url, latitude, longitude).then(response => {
        this.setState({
          forecastData: response.data,
          forecastResponse: response.data,
        });
      });
    }
  }

  handleUnitChange() {
    this.setState({
      isCelcius: !this.state.isCelcius,
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <UnitToggle unitChange={this.handleUnitChange} checkUnit={this.state.isCelcius} />
            <Nav />
            <Route
              exact
              path="/"
              render={() => (
                <Weather
                  isCelcius={this.state.isCelcius}
                  weatherData={this.state.weatherData}
                  apiResponse={this.state.weatherResponse}
                  temperature={this.state.temperature}
                />
              )}
            />
            <Route
              path="/forecast"
              render={() => (
                <Forecast
                  isCelcius={this.state.isCelcius}
                  forecastData={this.state.forecastData}
                  apiResponse={this.state.forecastResponse}
                />
              )}
            />
            <Route path="/pollution" component={AirQuality} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
