import React from 'react';
import { mount, shallow } from 'enzyme';
import ForecastDay from '../../src/components/ForecastDay';
import { serverResponses } from '../mock/mockResponse';

it('should render ForecastDay component without crashing', () => {
  shallow(<ForecastDay />);
});

it("should render a day's weather correctly", () => {
  const {
    date, temperature, weather, icon,
  } = serverResponses[0].forecast[0];
  const { unit, type } = serverResponses[0].weather.temperature;
  const wrapper = mount(<ForecastDay
    dayOfWeek={date}
    temperature={temperature}
    weather={weather}
    icon={icon}
    unit={unit}
    type={type}
  />);

  const day = wrapper.find('h1.forecastday__title').text();
  const temp = wrapper.find('h3.forecastday__subtitle').text();
  const dayWeather = wrapper.find('p.forecastday__subtitle').text();
  const weatherIcon = wrapper.find('i');

  expect(day).toEqual('Fri');
  expect(temp).toEqual('103.05° F');
  expect(dayWeather).toEqual('Clear');
  expect(weatherIcon.hasClass('wi-owm-01d')).toEqual(true);
});
