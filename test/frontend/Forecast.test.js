import React from 'react';
import { mount } from 'enzyme';
import Forecast from '../../src/components/Forecast';
import { serverResponses } from '../mock/mockResponse';

it('should render Forecast component without crashing', () => {
  mount(<Forecast forecastData={serverResponses[0].forecast} />);
});

it('should render 5 days of weather on default', () => {
  const wrapper = mount(<Forecast forecastData={serverResponses[0].forecast} />);

  const forecastDays = wrapper.find('div.forecast__display').children().length;

  expect(forecastDays).toEqual(5);
});

it('should render 3 days of weather on button click', () => {
  const wrapper = mount(<Forecast forecastData={serverResponses[0].forecast} />);
  const button = wrapper.find('button.forecast__button');
  button.simulate('click');
  const forecastDays = wrapper.find('div.forecast__display').children().length;

  expect(forecastDays).toEqual(3);
});

it('should render the correct information for day 4', () => {
  const wrapper = mount(<Forecast forecastData={serverResponses[0].forecast} />);

  const dayFour = wrapper
    .find('div.forecast__display')
    .children()
    .at(3)
    .text();

  expect(dayFour).toContain('Clear');
  expect(dayFour).toContain('Mon');
});
