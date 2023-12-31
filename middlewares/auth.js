const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Custom callback function implementation to verify callback from passport
 * - If authentication failed, reject the promise and send back an ApiError object with
 * --- Response status code - "401 Unauthorized"
 * --- Message - "Please authenticate"
 *
 * - If authentication succeeded,
 * --- set the `req.user` property as the user object corresponding to the authenticated token
 * --- resolve the promise
 */
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  try {
    if (err || !user || info) {
      // If authentication failed
      const errorMessage = err ? err.message : 'Please authenticate';
      const apiError = new ApiError(httpStatus.UNAUTHORIZED, errorMessage);
      return reject(apiError);
    }

    // If authentication succeeded
    req.user = user; // Set the `req.user` property
    resolve(); // Resolve the promise
  } catch (error) {
    reject(error); // Reject the promise if an error occurs during verification
  }
};

/**
 * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
 *
 */
const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
