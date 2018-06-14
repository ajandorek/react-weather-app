import React from 'react';
import { shallow } from 'enzyme';
import UnitToggle from '../src/components/UnitToggle';

it('renders UnitToggle component without crashing', () => {
  shallow(<UnitToggle />);
});
