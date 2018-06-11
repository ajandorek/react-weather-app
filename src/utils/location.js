<<<<<<< HEAD
const getLocation = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).catch(e => {
    throw new Error('Unexpected response from geolocation', e);
  });

export default getLocation;
=======
const getCurrentPosition = (options = {}) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

export const getLocation = async () => {
  let position;
  try {
    position = await getCurrentPosition();
  } catch (error) {
    throw new Error(error);
  } finally {
    return position; // eslint-disable-line
  }
};
>>>>>>> separate utility functions into their own files
