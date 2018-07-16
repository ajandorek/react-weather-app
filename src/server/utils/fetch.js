const axios = require('axios');
const serviceUrl = require('../../shared/utils/url');

const getWeatherInformation = async (latitude, longitude) => {
  let currentWeather;
  let forecast;
  let uvdata;

  await axios.get(serviceUrl('weather', latitude, longitude)).then(response => {
    const { name, weather, main } = response.data;
    currentWeather = {
      data: {
        name,
        description: weather[0].description,
        icon: weather[0].icon,
      },
      temperature: {
        value: main.temp,
      },
    };

    return currentWeather;
  });
  await axios.get(serviceUrl('forecast/daily', latitude, longitude)).then(response => {
    const { list } = response.data;
    forecast = list.map(day => ({
      date: day.dt,
      temperature: day.temp.day,
      weather: day.weather[0].main,
      icon: day.weather[0].icon,
    }));

    return forecast;
  });
  await axios.get(serviceUrl('uvi', latitude, longitude)).then(response => {
    const { data } = response;
    uvdata = data.value;

    return uvdata;
  });

  const results = { weather: currentWeather, uvdata, forecast };
  return results;
};

module.exports = getWeatherInformation;
