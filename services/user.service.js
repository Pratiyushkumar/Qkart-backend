const { User } = require('../models/users.models.js');
const ApiError = require('../utils/ApiError.js');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */

const getUserById = async (id) => {
  try {
    const resultById = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!resultById || resultById.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return resultById; // Assuming the query returns an array of users
  } catch (error) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid ID format or query error'
    );
  }
};

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */

const getUserByEmail = async (email) => {
  try {
    const resultByEmail = await User.findOne({ email: email });
    return resultByEmail;
  } catch (error) {
    return error;
  }
};

/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

const createUser = async (user) => {
  const emailFind = await User.findOne({ email: user.email });
  if (emailFind) {
    throw new ApiError(httpStatus[200], 'Email already taken');
  }

  const hashingPassword = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
  const userData = { ...user, password: hashingPassword };
  try {
    const newUser = await User.insertMany(userData);
    return newUser[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUserByEmail, getUserById };
