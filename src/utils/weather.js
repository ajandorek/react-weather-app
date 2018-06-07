import axios from 'axios';

export const toCelcius = temp => Math.round((temp - 32) * (5 / 9) * 100) / 100;

export const renderWeatherImg = img => `wi wi-owm-${img}`;

const getServiceUrl = (service, latitude, longitude) =>
  `http://api.openweathermap.org/data/2.5/${service}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

export const getWeatherInformation = async (service, latitude, longitude) => {
  const url = getServiceUrl(service, latitude, longitude);
  const response = await axios.get(url);
  return response;
};

export const uvIndexMessage = index => {
  if (index >= 0 && index <= 6) {
    return "The UV Index isn't too bad currently.";
  } else if (index > 6 && index < 8) {
    return 'Be sure to use sunscreen. The UV Index is currently High.';
  }
  return 'Be careful! The UV Index is currently Very High!';
};
