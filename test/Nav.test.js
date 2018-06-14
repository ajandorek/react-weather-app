import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../src/components/Nav';

it('renders Nav component without crashing', () => {
  shallow(<Nav />);
});
