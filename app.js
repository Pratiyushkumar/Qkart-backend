const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

let app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Node Express Mongoose API!',
    version: '1.0.0',
    description:
      'This API serves as the backend for the Node Express Mongoose Starter project. It is built with Node, Express, MongoDB, Mongoose.',
    author: 'Pratiyush',
    repository: '',
    documentation: '',
  });
});

app.use('/v1', routes);

module.exports = app;
