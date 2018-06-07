import axios from 'axios';

export const getWeatherInformation = async url => {
  const response = await axios.get(url);
  return response;
};

export const toCelcius = temp => Math.round((temp - 32) * (5 / 9) * 100) / 100;

export const renderWeatherImg = img => `wi wi-owm-${img}`;
