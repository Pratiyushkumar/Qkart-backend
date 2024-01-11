const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config.js');
const { User } = require('../models/index.js');
const { tokenTypes } = require('./token.js');
const mongoose = require('mongoose');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (tokenTypes.ACCESS !== payload.type) {
      throw Error('Invalid token type');
    } else {
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(payload.sub),
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  } catch (err) {
    return done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
