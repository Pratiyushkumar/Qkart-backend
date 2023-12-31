const Joi = require('joi');
const { password } = require('./custom.validations.js');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().custom(password),
  }),
};

const login = {};

module.exports = {
  register,
  login,
};
