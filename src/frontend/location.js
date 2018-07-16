import axios from 'axios';
import { getAPIURL } from '../shared/utils/url';

export const getLocation = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).catch(e => {
    throw new Error('Unexpected response from geolocation', e);
  });

export const sendLocation = async location => {
  const response = await axios.post(`${getAPIURL}/api/weather`, location);
  return response;
};
