const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.port || 4444;
const db = require('./data/models');
const errorRef = require('./utils/errorRef');
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
  try {
    let people = await db.get();
    res.json(people);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// POST PEOPLE

// PUT PEOPLE

// DELETE PEOPLE

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

module.exports = server;
