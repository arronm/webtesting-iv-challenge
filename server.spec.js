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
    it('should respond with 200 OK', async () => {
      await supertest(server)
        .get('/api/people')
        .expect(200);
    });

    it('should respond with json content', async () => {
      await supertest(server)
        .get('/api/people')
        .expect('Content-Type', /json/i);
    });

    it('should respond with an empty object', async () => {
      const request = await supertest(server)
        .get('/api/people')
        .expect(200);
      expect(request.body.length).toBe(0);
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
  
  describe('GET /api/people/:id', () => {
    it('should correctly get a user with an existing id', async () => {
      const person = {
        name: 'Jimmy',
        email: 'jimbob@gmail.com',
      };

      await supertest(server)
        .post('/api/people')
        .send(person)
        .expect(201);
      
      const request = await supertest(server)
        .get('/api/people/1')
        .expect(200);
      
      expect(request.body.name).toBe('Jimmy');
      expect(request.body.email).toBe('jimbob@gmail.com');
    });

    it('should correctly handle when the requested id does not exist', async () => {
      const request = await supertest(server)
        .get('/api/people/1')
        .expect(404);
      expect(request.body).toEqual({ message: "Could not find a resource with an id of (1)" });
    });
  });

  describe('PUT /api/people', () => {
    const endpoint = '/api/people';
    it('should modify an existing user', async () => {
      const person = {
        name: 'Jimmy',
        email: 'jimbob@gmail.com',
      };
      await supertest(server)
        .post(endpoint)
        .send(person)
        .expect(201);
      const request = await supertest(server)
        .put(`${endpoint}/1`)
        .send({
          ...person,
          email: 'jimbo@gmail.com',
        })
        .expect(200);
      expect(request.body).toEqual({
        ...person,
        email: 'jimbo@gmail.com',
        id: 1,
      });
    });

    it('should correctly handle when an id does not exist', async () => {
      const request = await supertest(server)
        .del(`${endpoint}/1`)
        .expect(404);
      expect(request.body).toEqual({ message: "Could not find a resource with an id of (1)" });
    });
  });

  describe('DELETE /api/people', () => {
    const endpoint = '/api/people';
    it('should correctly delete a user with the given an existing id', async () => {
      const person = {
        name: 'Jimmy',
        email: 'jimbob@gmail.com',
      };

      await supertest(server)
        .post(endpoint)
        .send(person)
        .expect(201);

      request = await supertest(server)
        .del(`${endpoint}/1`)
        .expect(200);
      
      expect(request.body).toEqual({
        ...person,
        id: 1,
      });

      request = await supertest(server)
        .get(endpoint)
        .expect(200);
      
      expect(request.body.length).toBe(0);
    });

    it('should correctly handle when an id does not exist', async () => {
      const request = await supertest(server)
        .del(`${endpoint}/1`)
        .expect(404);
      expect(request.body).toEqual({ message: "Could not find a resource with an id of (1)" });
    });
  });
});
