const { tokenTypes } = require('../../config/token');
const tokenService = require('../../services/token.service');
const { userOne, userTwo } = require('./user.fixture');

const accessTokenExpires = Math.floor(Date.now() / 1000) + 240000;

const userOneAccessToken = tokenService.generateToken(
  userOne._id,
  accessTokenExpires,
  tokenTypes.ACCESS
);

const userTwoAccessToken = tokenService.generateToken(
  userTwo._id,
  accessTokenExpires,
  tokenTypes.ACCESS
);

module.exports = {
  userOneAccessToken,
  userTwoAccessToken,
};
