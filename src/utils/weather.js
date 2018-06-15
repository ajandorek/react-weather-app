import axios from 'axios';
import { setTimeStamp } from './time';

export const renderWeatherImg = img => `wi wi-owm-${img}`;

export const serviceUrl = (service, latitude, longitude) =>
  `https://api.openweathermap.org/data/2.5/${service}?lat=${latitude}&lon=${longitude}&appid=${
    process.env.OPENWEATHER_APIKEY
  }&units=imperial`;

export const getWeatherInformation = async (service, latitude, longitude) => {
  const url = serviceUrl(service, latitude, longitude);
  const response = await axios.get(url);
  setTimeStamp();

  if (service === 'forecast/daily') {
    const { data } = response;
    localStorage.setItem('forecast', JSON.stringify(data.list));
    return data.list;
  } else if (service === 'weather') {
    const { data } = response;
    const weather = {
      temperature: { type: 'FAHRENHEIT', value: data.main.temp, unit: 'F' },
      data: {
        name: data.name,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
    };
    localStorage.setItem('weather', JSON.stringify(weather));
    return weather;
  } else if (service === 'uvi') {
    const { data } = response;
    localStorage.setItem('uvdata', JSON.stringify(data.value));
    return data.value;
  }
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
