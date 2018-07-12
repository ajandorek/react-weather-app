const serviceUrl = (service, latitude, longitude) =>
  `https://api.openweathermap.org/data/2.5/${service}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

module.exports = serviceUrl;
