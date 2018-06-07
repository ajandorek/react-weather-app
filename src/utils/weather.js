import axios from 'axios';

const getCurrentPosition = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

export const getLocation = async () => {
  let position;
  try {
    position = await getCurrentPosition();
  } catch (error) {
    console.log(error);
  }
  return position;
};

export const currentWeather = async (lat, lon) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

  const response = await axios.get(url);

  return response;
};

export const toCelcius = temp => Math.round((temp - 32) * (5 / 9) * 100) / 100;

export const renderWeatherImg = img => `wi wi-owm-${img}`;
