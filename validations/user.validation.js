const Joi = require('joi');
const { objectId } = require('./custom.validations');

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = { getUser };
