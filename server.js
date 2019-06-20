const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./data/models');
const errorRef = require('./utils/errorRef');
const validateBody = require('./middleware/validateBody');
const validateId = require('./middleware/validateId');

const middleware = [
  express.json(),
  helmet(),
  cors(),
];

server = express();
server.use(middleware);

server.get('/', (req, res) => {
  res.json('API Is Working');
});

// GET PEOPLE
server.get('/api/people', async (req, res) => {
  try {
    let people = await db.get();
    res.json(people);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

const bodyShape = {
  name: {
    required: true,
    type: 'string',
  },
  email: {
    required: true,
    type: 'string',
  },
};

// POST PEOPLE
server.post('/api/people', validateBody(bodyShape), async (req, res) => {
  try {
    let person = await db.add(req.body);
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// PUT PEOPLE

// DELETE PEOPLE
server.delete('/api/people/:id', validateId(db), async (req, res) => {
  try {
    let person = await db.remove(req.resource.id);
    res.json(person);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
})

// server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

module.exports = server;
