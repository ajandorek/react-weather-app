import React from 'react';
import { mount, shallow } from 'enzyme';
import Weather from '../src/components/Weather';
import { fahrenheitTemp, celciusTemp, data } from './utils/mockWeather';

it('renders Weather component without crashing', () => {
  shallow(<Weather />);
});

it('renders the correct weather in Fahrenheit', () => {
  const { value, unit } = fahrenheitTemp;
  const wrapper = mount(<Weather temperature={value} unit={unit} />);

  const heading = wrapper
    .find('h2.weather__subheading')
    .at(0)
    .text();

  expect(heading).toBe('Currently: 99.6° F');
});

it('renders the correct weather in celcius', () => {
  const { value, unit } = celciusTemp;
  const wrapper = mount(<Weather temperature={value} unit={unit} />);

  const heading = wrapper
    .find('h2.weather__subheading')
    .at(0)
    .text();

  expect(heading).toBe('Currently: 33.44° C');
});

it('renders the correct city, weather, and icon', () => {
  const { name, icon, description } = data;
  const wrapper = mount(<Weather name={name} icon={icon} description={description} />);

  const heading = wrapper.find('h1.weather__title').text();
  const weather = wrapper
    .find('h2.weather__subheading')
    .at(1)
    .text();
  const weatherIcon = wrapper
    .find('div.weather')
    .children()
    .at(3);

  expect(heading).toBe("Today's weather for Austin");
  expect(weather).toBe('Current Weather: Scattered Clouds');
  expect(weatherIcon.hasClass('wi-owm-03d')).toEqual(true);
});
