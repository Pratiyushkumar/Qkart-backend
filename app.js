const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const compression = require('compression');

let app = express();
const { jwtStrategy } = require('./config/passport.js');
const helmet = require('helmet');
const passport = require('passport');

app.use(helmet());

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

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

passport.use(jwtStrategy);

app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;
