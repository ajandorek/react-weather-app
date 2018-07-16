import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : 'http://localhost:3000';

export const getLocation = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).catch(e => {
    throw new Error('Unexpected response from geolocation', e);
  });

export const sendLocation = location => axios.post(`${url}/api/weather`, location);
