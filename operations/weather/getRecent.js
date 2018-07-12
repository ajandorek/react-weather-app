const Weather = require('../../models/weather');

module.exports = (req, res) => {
  Weather.find({}, (err, weather) => {
    if (err) {
      res.send(err);
    }
    res.json(weather);
  })
    .sort({ _id: -1 })
    .limit(1);
};
