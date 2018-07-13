const request = require('supertest');
const app = require('../../app');

const { serverResponses, populateWeather } = require('../mock/mockResponse.js');

beforeEach(populateWeather);
describe('SERVER TESTING', () => {
  describe('GET /api/weather', () => {
    it('should return a list of all 3 weather entries', done => {
      request(app)
        .get('/api/weather')
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(3);
        })
        .end(done);
    });
  });

  describe('GET /api/weather/new', () => {
    it('should return the most recent weather request', done => {
      request(app)
        .get('/api/weather/new')
        .expect(200)
        .expect(res => {
          expect(res.body[0].weather).toEqual(serverResponses[2].weather);
        })
        .end(done);
    });
  });

  describe('POST /api/weather', () => {
    it('should post a new weather item', () => {
      request(app)
        .post('/api/weather')
        .send(serverResponses[2])
        .expect(200)
        .expect(res => {
          expect(res.body.weather).toEqual(serverResponses[2].weather);
          expect(res.body.forecast).toEqual(serverResponses[2].forecast);
          expect(res.body.uvdata).toEqual(serverResponses[2].uvdata);
        });
    });
  });
});
