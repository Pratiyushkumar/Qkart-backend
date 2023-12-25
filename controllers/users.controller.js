const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError.js');
const catchAsync = require('../utils/catchAsync.js');
const { userService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userDetail = await userService.getUserById(userId);
  if (!userDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user entity not found in DB');
  }
  res.status(200).json(userDetail);
});

module.exports = {
  getUser,
};
