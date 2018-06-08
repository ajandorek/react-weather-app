const getLocation = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).catch(e => {
    throw new Error('Unexpected response from geolocation', e);
  });

export default getLocation;
