import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fahrenheitTemp, celciusTemp } from '../mock/mockWeather';
import {
  weatherResponse,
  weatherRequest,
  forecastRequest,
  uviRequest,
  uviResponse,
} from '../mock/mockResponse';
import {
  toCelcius,
  toFahrenheit,
  TEMP_CONSTS,
  uvIndexMessage,
  renderWeatherImg,
  serviceUrl,
  getWeatherInformation,
} from '../../src/utils/weather';

const mock = new MockAdapter(axios);

describe('weather utility function', () => {
  it('does convert Celcius to Fahrenheit', () => {
    const fahrenheit = toFahrenheit(celciusTemp.value);
    const fahrenheit2 = toFahrenheit(100);
    const fahrenheit3 = toFahrenheit(0);

    expect(typeof fahrenheit.value).toBe('string');
    expect(fahrenheit).toEqual({
      type: TEMP_CONSTS.FAHRENHEIT,
      value: '92.19',
      unit: 'F',
    });

    expect(typeof fahrenheit2.value).toBe('string');
    expect(fahrenheit2).toEqual({
      type: TEMP_CONSTS.FAHRENHEIT,
      value: '212.00',
      unit: 'F',
    });

    expect(typeof fahrenheit3.value).toBe('string');
    expect(fahrenheit3).toEqual({
      type: TEMP_CONSTS.FAHRENHEIT,
      value: '32.00',
      unit: 'F',
    });
  });

  it('does convert Fahrenheit to Celcius', () => {
    const celcius = toCelcius(fahrenheitTemp.value);
    const celcius2 = toCelcius(212);
    const celcius3 = toCelcius(32);

    expect(typeof celcius.value).toBe('string');
    expect(celcius).toEqual({
      type: TEMP_CONSTS.CELCIUS,
      value: '37.56',
      unit: 'C',
    });

    expect(typeof celcius2.value).toBe('string');
    expect(celcius2).toEqual({
      type: TEMP_CONSTS.CELCIUS,
      value: '100.00',
      unit: 'C',
    });

    expect(typeof celcius3.value).toBe('string');
    expect(celcius3).toEqual({
      type: TEMP_CONSTS.CELCIUS,
      value: '0.00',
      unit: 'C',
    });
  });

  it('does create the correct UVIndex message', () => {
    const high = uvIndexMessage(10);
    const medium = uvIndexMessage(7);
    const low = uvIndexMessage(2);

    expect(high).toEqual('Be careful! The UV Index is currently Very High!');
    expect(medium).toEqual('Be sure to use sunscreen. The UV Index is currently High.');
    expect(low).toEqual("The UV Index isn't too bad currently.");
  });

  it('creates a class to render the correct icon based on input', () => {
    const cloud = renderWeatherImg('01d');
    const smile = renderWeatherImg('hello');

    expect(cloud).toEqual('wi wi-owm-01d');
    expect(smile).toEqual('wi wi-owm-hello');
  });

  it('creates a url for making an ajax request', () => {
    const url = serviceUrl('forecast/day', 37, 92);
    const url2 = serviceUrl('hello', 10, 15);

    expect(url).toEqual(`https://api.openweathermap.org/data/2.5/forecast/day?lat=37&lon=92&appid=${
      process.env.OPENWEATHER_APIKEY
    }&units=imperial`);

    expect(url2).toEqual(`https://api.openweathermap.org/data/2.5/hello?lat=10&lon=15&appid=${
      process.env.OPENWEATHER_APIKEY
    }&units=imperial`);
  });

  it('makes an api request for current weather information', done => {
    const url = serviceUrl('weather', 37, 92);

    mock.onGet(url).reply(200, weatherRequest);
    getWeatherInformation('weather', 37, 92).then(response => {
      expect(response).toEqual(weatherResponse);
      expect(JSON.parse(localStorage.getItem('weather'))).toEqual(weatherResponse);
      done();
    });
  });

  it('makes an api request for forecast information', done => {
    const url = serviceUrl('forecast/daily', 37, 92);

    mock.onGet(url).reply(200, forecastRequest);
    getWeatherInformation('forecast/daily', 37, 92).then(response => {
      expect(response).toEqual(forecastRequest.list);
      expect(JSON.parse(localStorage.getItem('forecast'))).toEqual(forecastRequest.list);
      done();
    });
  });

  it('makes an api request for UV Index information', done => {
    const url = serviceUrl('uvi', 37, 92);

    mock.onGet(url).reply(200, uviRequest);
    getWeatherInformation('uvi', 37, 92).then(response => {
      expect(response).toEqual(uviResponse);
      expect(JSON.parse(localStorage.getItem('uvdata'))).toEqual(uviResponse);
      done();
    });
  });

  it('gets a response status of 200 from the api', () => {
    const weatherUrl = serviceUrl('weather', 37, 92);
    const forecastUrl = serviceUrl('forecast/daily', 37, 92);
    const uviUrl = serviceUrl('uvi', 37, 92);

    axios.get(weatherUrl).then(res => expect(res.status).toEqual(200));
    axios.get(forecastUrl).then(res => expect(res.status).toEqual(200));
    axios.get(uviUrl).then(res => expect(res.status).toEqual(200));
  });
});
