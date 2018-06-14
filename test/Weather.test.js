import React from 'react';
import { shallow } from 'enzyme';
import Weather from '../src/components/Weather';

it('renders Weather component without crashing', () => {
  shallow(<Weather />);
});
