const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../models/index');
const { userOne, insertUsers, userTwo } = require('../fixtures/user.fixture');
const {
  userOneAccessToken,
  userTwoAccessToken,
} = require('../fixtures/token.fixture');

setupTestDB();

describe('userRoute', () => {
  it('should return 200 and user object if data is ok', async () => {
    await insertUsers([userOne]);
    const res = await request(app)
      .get(`/v1/users/${userOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send();
    expect(res.status).toEqual(httpStatus.OK);
    expect(res._body).toHaveProperty('_id');
    expect(res._body).toHaveProperty('email');
    expect(res._body).toHaveProperty('name');
    expect(res._body).toHaveProperty('walletMoney');
  }, 10000);

  it("should return 400 if userId isn't a valid MongoID", async () => {
    await insertUsers([userOne]);
    const res = await request(app)
      .get(`/v1/users/invalidMongoID`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send();
    expect(res.status).toEqual(httpStatus.BAD_REQUEST);
  });
  it('should return 401 error if access token is missing', async () => {
    await insertUsers([userOne]);
    const res = await request(app).get(`/v1/users/${userOne._id}`).send();
    expect(res.status).toEqual(httpStatus.UNAUTHORIZED);
  });
});
