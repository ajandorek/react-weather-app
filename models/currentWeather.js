const mongoose = require('mongoose');

const { Schema } = mongoose;

const CurrentWeatherSchema = Schema({
  data: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  temperature: {
    type: {
      type: String,
      default: 'FAHRENHEIT',
    },
    value: {
      type: Number,
    },
    unit: {
      type: String,
      default: 'F',
    },
  },
});

module.exports = CurrentWeatherSchema;
