import axios from 'axios';
import { setTimeStamp } from './time';
import { getAPIURL } from '../shared/utils/url';

export const renderWeatherImg = img => `wi wi-owm-${img}`;

export const getWeather = async () => {
  const response = await axios.get(`${getAPIURL}/api/weather/new`);
  localStorage.setItem('weatherInfo', JSON.stringify(response.data[0]));
  setTimeStamp();
  return response.data[0];
};

export const uvIndexMessage = index => {
  if (index >= 0 && index <= 6) {
    return "The UV Index isn't too bad currently.";
  } else if (index > 6 && index < 8) {
    return 'Be sure to use sunscreen. The UV Index is currently High.';
  }
  return 'Be careful! The UV Index is currently Very High!';
};

export const TEMP_CONSTS = {
  FAHRENHEIT: 'FAHRENHEIT',
  CELCIUS: 'CELCIUS',
};

export const toFahrenheit = value => ({
  type: TEMP_CONSTS.FAHRENHEIT,
  value: (value * 1.8 + 32).toFixed(2),
  unit: 'F',
});

export const toCelcius = value => ({
  type: TEMP_CONSTS.CELCIUS,
  value: ((value - 32) / 1.8).toFixed(2),
  unit: 'C',
});
