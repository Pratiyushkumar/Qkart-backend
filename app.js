const express = require('express');

let app = express();

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

module.exports = app;
