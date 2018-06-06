import axios from 'axios';

export const currentWeather = async () => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=30.267153&lon=-97.7430608&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

  const response = await axios.get(url);

  return response;
};

export const toCelcius = temp => Math.round((temp - 32) * (5 / 9) * 100) / 100;
