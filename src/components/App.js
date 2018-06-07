import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getWeatherInformation } from '../utils/weather';
import getLocation from '../utils/location';

import UVIndex from './UVIndex';
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
      uvResponse: false,
      uvData: null,
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
        this.getUVIndex();
      });
    }
  }

  getCurrentWeather() {
    const { latitude, longitude, location } = this.state;
    if (location) {
      getWeatherInformation('weather', latitude, longitude).then(response => {
        const { data } = response;
        this.setState({
          weatherData: data,
          weatherResponse: true,
          temperature: data.main.temp,
        });
      });
    }
  }

  getCurrentForecast() {
    const { latitude, longitude, location } = this.state;
    if (location) {
      getWeatherInformation('forecast/daily', latitude, longitude).then(response => {
        const { data } = response;
        this.setState({
          forecastData: data,
          forecastResponse: true,
        });
      });
    }
  }

  handleUnitChange() {
    const { isCelcius } = this.state;
    this.setState({
      isCelcius: !isCelcius,
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
              exact
              path="/forecast"
              render={() => (
                <Forecast
                  isCelcius={this.state.isCelcius}
                  forecastData={this.state.forecastData}
                  apiResponse={this.state.forecastResponse}
                />
              )}
            />
            <Route
              path="/uvindex"
              render={() => (
                <UVIndex uvData={this.state.uvData} uvResponse={this.state.uvResponse} />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
