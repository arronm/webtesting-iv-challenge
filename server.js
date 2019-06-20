const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.port || 4444;
const db = require('./data/models');
const middleware = [
  express.json(),
  cors(),
  helmet(),
];

server = express();
server.use(middleware);

server.get('/', (req, res) => {
  res.json('API Is Working');
});

// GET PEOPLE
server.get('/api', async (req, res) => {
  let people = await db.get();
  res.json(people);
});

// POST PEOPLE

// PUT PEOPLE

// DELETE PEOPLE

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
