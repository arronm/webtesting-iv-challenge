const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.port || 4444;
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

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
