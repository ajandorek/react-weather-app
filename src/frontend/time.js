import moment from 'moment';

export const setTimeStamp = () => {
  localStorage.setItem('timeStamp', moment().unix());
};

export const checkTimeStamp = () => {
  const expirationTime = 6000;
  const currentTimestamp = moment().unix();
  const timeStamp = localStorage.getItem('timeStamp');
  if (currentTimestamp - timeStamp >= expirationTime) {
    localStorage.removeItem('weatherInfo');
    return false;
  }
  return true;
};
