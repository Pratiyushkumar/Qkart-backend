const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError.js');
const catchAsync = require('../utils/catchAsync.js');
const { userService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  console.log('getUser controller', req.params);
  const { userId } = req.params;
  console.log('line 9 userid', userId);
  const userDetail = await userService.getUserById(userId);
  console.log('line 11 in getuser controller', { userDetail });
  if (!userDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user entity not found in DB');
  }
  res.status(200).json(userDetail);
});

module.exports = {
  getUser,
};
