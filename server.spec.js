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

    it('response with json content', async () => {
      const res = await supertest(server)
        .get('/');
      
      expect(res.body).toEqual('API Is Working');
    });
  });
});
