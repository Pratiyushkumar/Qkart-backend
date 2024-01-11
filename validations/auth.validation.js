const Joi = require('joi');
const { password } = require('./custom.validations.js');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().custom(password),
  }),
};

module.exports = {
  register,
  login,
};
