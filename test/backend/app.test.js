const request = require('supertest');
const app = require('../../app');

const { serverResponses } = require('../mock/mockResponse.js');
const WeatherModel = require('./../models/weather');
