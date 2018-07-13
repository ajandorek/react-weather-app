const mongoose = require('mongoose');

const { Schema } = mongoose;

const ForecastSchema = Schema(
  {
    date: {
      type: Number,
    },
    temperature: {
      type: Number,
    },
    weather: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  { _id: false },
);

module.exports = ForecastSchema;
