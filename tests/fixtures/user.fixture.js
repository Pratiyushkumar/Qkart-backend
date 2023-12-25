const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { User } = require('../../models');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: new mongoose.Types.ObjectId(),
  walletMoney: 200,
  name: faker.person.fullName().toLowerCase(),
  email: faker.internet.email().toLowerCase(),
  password,
  address: 'ADDRESS_NOT_SET',
  createdAt: '2023-12-25T16:04:12.949Z',
  updatedAt: '2023-12-25T16:04:12.949Z',
};

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  walletMoney: 200,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: '$2a$08$5p0W4U/zA1iNQtl3z6GdseBrApMivzsPYcaHWuZNKIVhHe.w6yera',
  address: 'ADDRESS_NOT_SET',
  createdAt: '2023-12-25T16:04:12.949Z',
  updatedAt: '2023-12-25T16:04:12.949Z',
};

const insertUsers = async (users) => {
  await User.insertMany(
    users.map((user) => ({ ...user, password: hashedPassword }))
  );
};

module.exports = {
  userOne,
  userTwo,
  insertUsers,
};
