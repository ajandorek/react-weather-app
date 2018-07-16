const serviceUrl = (service, latitude, longitude) =>
  `https://api.openweathermap.org/data/2.5/${service}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

const getAPIURL =
  process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : 'http://localhost:3000';

module.exports = { serviceUrl, getAPIURL };
