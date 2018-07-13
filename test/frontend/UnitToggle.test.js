import React from 'react';
import { mount, shallow } from 'enzyme';
import UnitToggle from '../../src/components/UnitToggle';

it('renders UnitToggle component without crashing', () => {
  shallow(<UnitToggle />);
});

it('should convert toFahrenheit onClick', () => {
  const toFahrenheit = jest.fn();
  const wrapper = mount(<UnitToggle changeUnit={toFahrenheit} />);

  const button = wrapper.find('button.unitChange__button').at(0);
  button.simulate('click');
  expect(toFahrenheit).toHaveBeenCalled();
});

it('should convert toCelcius onClick', () => {
  const toCelcius = jest.fn();
  const wrapper = mount(<UnitToggle changeUnit={toCelcius} />);

  const button = wrapper.find('button.unitChange__button').at(1);
  button.simulate('click');
  expect(toCelcius).toHaveBeenCalled();
});
