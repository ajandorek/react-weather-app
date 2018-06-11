import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getWeatherInformation } from '../utils/weather';
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

    this.changeToCelcius = this.changeToCelcius.bind(this);
    this.changeToFahrenheit = this.changeToFahrenheit.bind(this);
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
          weatherResponse: true,
          temperature: { type: 'FAHRENHEIT', value: data.main.temp, unit: 'F' },
          weatherData: {
            name: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          },
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
          forecastResponse: true,
          forecastData: data.list,
        });
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
              <UnitToggle
                toFahrenheit={this.changeToFahrenheit}
                toKelvin={this.changeToKelvin}
                toCelcius={this.changeToCelcius}
              />
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
                    currentType={temperature.type}
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
