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
