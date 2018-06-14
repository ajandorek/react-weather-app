import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getWeatherInformation, toCelcius, toFahrenheit, TEMP_CONSTS } from '../utils/weather';
import { checkTimeStamp } from '../utils/time';
import getLocation from '../utils/location';

import UVIndex from './UVIndex';
import Forecast from './Forecast';
import Nav from './Nav';
import UnitToggle from './UnitToggle';
import Weather from './Weather';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: false,
      infoInLocalStorage: false,
      latitude: null,
      longitude: null,
      weatherData: {},
      forecastData: {},
      forecastResponse: false,
      weatherResponse: false,
      uvResponse: false,
      uvData: null,
      temperature: {},
    };

    this.changeUnit = this.changeUnit.bind(this);
  }

  componentWillMount() {
    this.setState({
      infoInLocalStorage: checkTimeStamp(),
    });
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
    const {
      latitude, longitude, location, infoInLocalStorage,
    } = this.state;
    if (location && !infoInLocalStorage) {
      getWeatherInformation('weather', latitude, longitude).then(response => {
        this.setState({
          weatherResponse: true,
          temperature: response.temperature,
          weatherData: response.data,
        });
      });
    } else {
      const weather = JSON.parse(localStorage.getItem('weather'));
      this.setState({
        weatherResponse: true,
        temperature: weather.temperature,
        weatherData: weather.data,
      });
    }
  }

  getCurrentForecast() {
    const {
      latitude, longitude, location, infoInLocalStorage,
    } = this.state;
    if (location && !infoInLocalStorage) {
      getWeatherInformation('forecast/daily', latitude, longitude).then(response => {
        this.setState({
          forecastResponse: true,
          forecastData: response,
        });
      });
    } else {
      const data = JSON.parse(localStorage.getItem('forecast'));
      this.setState({
        forecastResponse: true,
        forecastData: data,
      });
    }
  }

  getUVIndex() {
    const {
      latitude, longitude, location, infoInLocalStorage,
    } = this.state;
    if (location && !infoInLocalStorage) {
      getWeatherInformation('uvi', latitude, longitude).then(response => {
        this.setState({
          uvData: response,
          uvResponse: true,
        });
      });
    } else {
      const data = JSON.parse(localStorage.getItem('uvdata'));
      this.setState({
        uvResponse: true,
        uvData: data,
      });
    }
  }

  changeUnit(unit) {
    const { temperature } = this.state;
    if (unit === TEMP_CONSTS.FAHRENHEIT && temperature.type === TEMP_CONSTS.CELCIUS) {
      this.setState({
        temperature: toFahrenheit(temperature.value),
      });
    } else if (unit === TEMP_CONSTS.CELCIUS && temperature.type === TEMP_CONSTS.FAHRENHEIT) {
      this.setState({
        temperature: toCelcius(temperature.value),
      });
    }
  }

  render() {
    const {
      weatherData,
      forecastData,
      forecastResponse,
      weatherResponse,
      uvResponse,
      uvData,
      temperature,
    } = this.state;
    return (
      <div className="container">
        <BrowserRouter>
          <div className="weather-container">
            <div className="weather-container__content">
              <UnitToggle changeUnit={this.changeUnit} temperature={temperature} />
              <Nav />
              <Route
                exact
                path="/"
                render={() => (
                  <Weather
                    apiResponse={weatherResponse}
                    temperature={temperature.value}
                    name={weatherData.name}
                    description={weatherData.description}
                    icon={weatherData.icon}
                    unit={temperature.unit}
                    type={temperature.type}
                  />
                )}
              />
              <Route
                exact
                path="/forecast"
                render={() => (
                  <Forecast
                    forecastData={forecastData}
                    apiResponse={forecastResponse}
                    currentUnit={temperature.unit}
                    type={temperature.type}
                  />
                )}
              />
              <Route
                path="/uvindex"
                render={() => <UVIndex uvData={uvData} uvResponse={uvResponse} />}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
