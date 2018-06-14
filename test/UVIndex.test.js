import React from 'react';
import { shallow } from 'enzyme';
import UVIndex from '../src/components/UVIndex';

it('renders UVIndex component without crashing', () => {
  shallow(<UVIndex />);
});
