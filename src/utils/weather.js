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
    throw new Error(error);
  } finally {
    return position; // eslint-disable-line
  }
};

export const getWeatherInformation = async url => {
  const response = await axios.get(url);
  return response;
};

export const toCelcius = temp => Math.round((temp - 32) * (5 / 9) * 100) / 100;

export const renderWeatherImg = img => `wi wi-owm-${img}`;
