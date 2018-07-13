import { fahrenheitTemp, celciusTemp } from '../mock/mockWeather';
import {
  toCelcius,
  toFahrenheit,
  TEMP_CONSTS,
  uvIndexMessage,
  renderWeatherImg,
} from '../../src/frontend/weather';

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
});
