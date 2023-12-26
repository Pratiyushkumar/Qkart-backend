const { User } = require('../../models/index');
const { userOne } = require('../fixtures/user.fixture');
const { userService } = require('../../services/index');
const ApiError = require('../../utils/ApiError');
const mockingoose = require('mockingoose');

describe('user test', () => {
  beforeEach(() => mockingoose.resetAll());

  it('should return user by email', async () => {
    mockingoose('User').toReturn(userOne, 'find');
    let userResponse = await userService.getUserByEmail(userOne.email);
    expect(userResponse._id).toEqual(userOne._id);
    expect(userResponse.name).toBe(userOne.name);
  });

  it('should return user', async () => {
    mockingoose(User).toReturn(userOne, 'findOne');
    let userResponse = await userService.getUserById(
      '658ab0954083a30748f8e948'
    );
    console.log('userResponse', userResponse);
    expect(userResponse._id).toEqual(userOne._id);
    expect(userResponse.name).toBe(userOne.name);
  });

  it('should Create user and  return user if success', async () => {
    let isEmailTakenMock = jest.fn();
    User.isEmailTaken = isEmailTakenMock.mockReturnValue(false);
    let createMock = jest.fn();
    User.create = createMock.mockReturnValue(userOne);
    let userResponse = await userService.createUser(userOne);
    expect(createMock).toHaveBeenCalled();
    expect(isEmailTakenMock).toHaveBeenCalled();
    expect(userResponse._id).toEqual(userOne._id);
    expect(userResponse.name).toBe(userOne.name);
  });

  it('should throw error if email already exists', async () => {
    User.isEmailTaken = jest.fn().mockReturnValue(true);
    expect(userService.createUser(userOne)).rejects.toThrow(ApiError);
  });
});
