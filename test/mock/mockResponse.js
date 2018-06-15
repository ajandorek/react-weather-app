export const weatherRequest = {
  name: 'Austin',
  main: {
    temp: 80.28,
  },
  data: {
    description: 'clear sky',
    icon: '02n',
  },
  weather: [
    {
      description: 'clear sky',
      icon: '02n',
    },
  ],
};

export const weatherResponse = {
  data: { description: 'clear sky', icon: '02n', name: 'Austin' },
  temperature: { type: 'FAHRENHEIT', unit: 'F', value: 80.28 },
};

export const forecastRequest = {
  list: [
    {
      dt: 1529060400,
      temp: {
        day: 80.28,
        min: 74.5,
        max: 80.28,
        night: 74.5,
        eve: 80.28,
        morn: 80.28,
      },
      pressure: 983.18,
      humidity: 75,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'sky is clear',
          icon: '01n',
        },
      ],
      speed: 2.26,
      deg: 50,
      clouds: 0,
    },
  ],
};

export const uviRequest = {
  lat: 10,
  lon: 15,
  date_iso: '2018-06-15T12:00:00Z',
  date: 1529064000,
  value: 11.77,
};

export const uviResponse = 11.77;
