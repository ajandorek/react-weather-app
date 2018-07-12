import axios from 'axios';

export const getLocation = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).catch(e => {
    throw new Error('Unexpected response from geolocation', e);
  });

export const sendLocation = location => axios.post('http://localhost:3000/api/weather', location);
