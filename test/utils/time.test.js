import moment from 'moment';
import { setTimeStamp, checkTimeStamp } from '../../src/frontend/time';

describe('time utility functions', () => {
  it('should create a timestamp and set it in local storage', () => {
    localStorage.setItem('testTimestamp', moment().unix());
    setTimeStamp();
    const timeStamp = localStorage.getItem('timeStamp');
    const testTimestamp = localStorage.getItem('testTimestamp');

    expect(parseInt(timeStamp, 10)).toBeLessThanOrEqual(parseInt(testTimestamp, 10));
  });

  it('should return false if current stored timestamp is over an hour old', () => {
    localStorage.setItem('timeStamp', 100);
    const oldTimeStamp = checkTimeStamp();

    expect(oldTimeStamp).toEqual(false);
  });

  it('should return true if current stored timestamp is under an hour old', () => {
    localStorage.setItem('timeStamp', moment().unix());
    const oldTimeStamp = checkTimeStamp();

    expect(oldTimeStamp).toEqual(true);
  });
});
