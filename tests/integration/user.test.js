const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../models/index');
const { userOne, insertUsers } = require('../fixtures/user.fixture');

setupTestDB();

describe('userRoute', () => {
  it('should return 200 and user object if data is ok', async () => {
    await insertUsers([userOne]);
    const res = await request(app).get(`/v1/users/${userOne._id}`).send();
    expect(res.status).toEqual(httpStatus.OK);
    expect(res._body[0]).toHaveProperty('_id');
    expect(res._body[0]).toHaveProperty('email');
    expect(res._body[0]).toHaveProperty('name');
    expect(res._body[0]).toHaveProperty('walletMoney');
  }, 10000);

  it("should return 400 if userId isn't a valid MongoID", async () => {
    await insertUsers([userOne]);
    const res = await request(app).get(`/v1/users/invalidMongoID`).send();

    expect(res.status).toEqual(httpStatus.BAD_REQUEST);
  });
});
