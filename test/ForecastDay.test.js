import React from 'react';
import { shallow } from 'enzyme';
import ForecastDay from '../src/components/ForecastDay';

it('renders ForecastDay component without crashing', () => {
  shallow(<ForecastDay />);
});
