const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { tokenTypes } = require('../config/token');

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (
  userId,
  expires = config.jwt.accessExpirationMinutes,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    type: type,
    exp: expires,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
  const expires = Math.floor(Date.now() / 1000) + 240000;
  const type = tokenTypes.ACCESS;
  const token = generateToken(user._id.toString(), expires, type);

  const expiryDate = new Date(expires * 1000).toISOString();
  return {
    access: {
      token: token,
      expires: expiryDate,
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
