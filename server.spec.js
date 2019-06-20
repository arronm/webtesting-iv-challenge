const supertest = require('supertest');

const server = require('./server.js');

describe('server', () => {
  describe('GET /', () => {
    it('response with 200 OK', async () => {
      await supertest(server)
        .get('/')
        .expect(200);
    });

    it('response with json content', async () => {
      await supertest(server)
        .get('/')
        .expect('Content-Type', /json/i);
    });
  });
});
