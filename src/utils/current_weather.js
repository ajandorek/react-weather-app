import axios from 'axios';

export const currentWeather = async () => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=30.267153&lon=-97.7430608&appid=${
    process.env.OPENWEATHER_APIKEY
  }`;

  const res = await axios.get(url);

  return res;
};
