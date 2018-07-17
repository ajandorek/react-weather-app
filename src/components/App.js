import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getWeather, toCelcius, toFahrenheit, TEMP_CONSTS } from '../frontend/weather';
import { checkTimeStamp } from '../frontend/time';
import { getLocation, sendLocation } from '../frontend/location';

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
      weatherData: {},
      forecastData: {},
      weatherResponse: false,
      uvData: null,
      temperature: {},
    };

    this.changeUnit = this.changeUnit.bind(this);
    this.getWeatherInformation = this.getWeatherInformation.bind(this);
  }

  componentWillMount() {
    checkTimeStamp();
    this.setState({
      infoInLocalStorage: !!localStorage.getItem('weatherInfo'),
    });
  }

  componentDidMount() {
    const { infoInLocalStorage } = this.state;
    if ('geolocation' in navigator && !infoInLocalStorage) {
      getLocation().then(response => {
        const { latitude, longitude } = response.coords;
        sendLocation({ longitude, latitude }).then(this.getWeatherInformation);
        this.setState({
          location: true,
        });
      });
    } else {
      this.getFromLocalStorage();
    }
  }

  getWeatherInformation() {
    const { location } = this.state;
    if (location) {
      getWeather().then(response => {
        const { weather, forecast, uvdata } = response.data[0];
        this.setState({
          weatherResponse: true,
          temperature: weather.temperature,
          weatherData: weather.data,
          uvData: uvdata,
          forecastData: forecast,
        });
      });
    }
  }

  getFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('weatherInfo'))[0];
    const { weather, forecast, uvdata } = data;
    this.setState({
      weatherResponse: true,
      temperature: weather.temperature,
      weatherData: weather.data,
      uvData: uvdata,
      forecastData: forecast,
    });
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
      weatherData, forecastData, weatherResponse, uvData, temperature,
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
                    apiResponse={weatherResponse}
                    currentUnit={temperature.unit}
                    type={temperature.type}
                  />
                )}
              />
              <Route
                path="/uvindex"
                render={() => <UVIndex uvData={uvData} uvResponse={weatherResponse} />}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
