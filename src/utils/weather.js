import axios from 'axios';

export const renderWeatherImg = img => `wi wi-owm-${img}`;

const getServiceUrl = (service, latitude, longitude) =>
  `http://api.openweathermap.org/data/2.5/${service}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

export const getWeatherInformation = async (service, latitude, longitude) => {
  const url = getServiceUrl(service, latitude, longitude);
  return axios.get(url);
};

export const uvIndexMessage = index => {
  if (index >= 0 && index <= 6) {
    return "The UV Index isn't too bad currently.";
  } else if (index > 6 && index < 8) {
    return 'Be sure to use sunscreen. The UV Index is currently High.';
  }
  return 'Be careful! The UV Index is currently Very High!';
};

export const toFahrenheit = ({ type, value, unit }) => {
  if (type !== 'CELCIUS') {
    return { type, value, unit };
  }
  const newTemp = {
    type: 'FAHRENHEIT',
    value: (value * 1.8 + 32).toFixed(2),
    unit: 'F',
  };
  return newTemp;
};

export const toCelcius = ({ type, value, unit }) => {
  if (type !== 'FAHRENHEIT') {
    return { type, value, unit };
  }
  const newTemp = {
    type: 'CELCIUS',
    value: ((value - 32) / 1.8).toFixed(2),
    unit: 'C',
  };
  return newTemp;
};
