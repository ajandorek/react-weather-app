const mongoose = require('mongoose');

const { Schema } = mongoose;
const CurrentWeatherSchema = require('./currentWeather');
const ForecastSchema = require('./forecast');

const WeatherSchema = Schema({
  weather: {
    type: CurrentWeatherSchema,
  },
  uvdata: {
    type: String,
  },
  forecast: {
    type: [ForecastSchema],
  },
});

const WeatherModel = mongoose.model('weather', WeatherSchema);

module.exports = WeatherModel;
