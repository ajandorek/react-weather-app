import React from 'react';
import { mount } from 'enzyme';
import Forecast from '../src/components/Forecast';

it('renders Forecast component without crashing', () => {
  const data = [
    {
      dt: 1528999200,
      temp: {
        day: 92.35,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
    },
  ];
  mount(<Forecast forecastData={data} />);
});
