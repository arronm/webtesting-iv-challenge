const supertest = require('supertest');

const db = require('./data/db.config');
const server = require('./server.js');

describe('server', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('people').truncate();
  });

  describe('GET /', () => {
    it('should respond with a status of 200 OK', async () => {
      await supertest(server)
        .get('/')
        .expect(200);
    });

    it('response with json content', async () => {
      const res = await supertest(server)
        .get('/');
      expect(res.body).toEqual('API Is Working');
    });
  })

  describe('GET /api/people', () => {
    it('response with 200 OK', async () => {
      await supertest(server)
        .get('/api/people')
        .expect(200);
    });

    it('response with json content', async () => {
      await supertest(server)
        .get('/api/people')
        .expect('Content-Type', /json/i);
    });
  });

  describe('POST /api/people', () => {
    const endpoint = '/api/people';
    it('should correctly insert a new user with status 201', async () => {
      const person = {
        name: 'Jimmy',
        email: 'jimbob@gmail.com',
      };

      let request = await supertest(server)
        .post(endpoint)
        .send(person)
        .expect(201);
      expect(request.body).toEqual({
        ...person,
        id: 1,
      });

      request = await supertest(server)
        .get(endpoint)
        .expect(200);
      expect(request.body.length).toBe(1);
    });

    it('should correctly handle missing email with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({ name: 'b' })
        .expect(400);
      expect(request.body).toEqual({ message: "Missing required field (email)" });
    });

    it('should correctly handle missing name with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({ email: 'b' })
        .expect(400);
      expect(request.body).toEqual({ message: "Missing required field (name)" });
    });

    it('should correctly handle wrong `name` type with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({
          name: 1,
          email: 'b',
        })
        .expect(400);
        expect(request.body).toEqual({ message: "Expected type for (name) to be string, but instead saw number" });
    });

    it('should correctly handle wrong `email` type with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({
          name: 'a',
          email: 1,
        })
        .expect(400);
        expect(request.body).toEqual({ message: "Expected type for (email) to be string, but instead saw number" });
    });
  });

  describe('DELETE /api/people', () => {
    const endpoint = '/api/people';
    it('should correctly delete a user with the given id', async () => {
      const person = {
        name: 'Jimmy',
        email: 'jimbob@gmail.com',
      };

      await supertest(server)
        .post(endpoint)
        .send(person)
        .expect(201);

      const request = await supertest(server)
        .del(`${endpoint}/1`)
        .expect(200);
      
      expect(request.body).toEqual(person);
    });
  });
});
