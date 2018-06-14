import React from 'react';
import { mount, shallow } from 'enzyme';
import ForecastDay from '../src/components/ForecastDay';
import { data } from './utils/mockForecastDay';

it('should render ForecastDay component without crashing', () => {
  shallow(<ForecastDay />);
});

it("should render a day's weather correctly", () => {
  const {
    dayOfWeek, temperature, weather, icon, unit, type,
  } = data;
  const wrapper = mount(<ForecastDay
    dayOfWeek={dayOfWeek}
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

  expect(day).toEqual('Tue');
  expect(temp).toEqual('95.67° F');
  expect(dayWeather).toEqual('Sunny');
  expect(weatherIcon.hasClass('wi-owm-01d')).toEqual(true);
});
