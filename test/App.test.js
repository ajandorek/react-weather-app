import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/App';

it('renders App component without crashing', () => {
  mount(<App />);
});
