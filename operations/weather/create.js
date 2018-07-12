const Weather = require('../../models/weather');
const getWeatherInformation = require('../../src/server/utils/fetch');

module.exports = (req, res) => {
  const { longitude, latitude } = req.body;

  getWeatherInformation(latitude, longitude).then(response => {
    Weather.create(response).then(obj => res.json(obj));
  });
};
