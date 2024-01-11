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
};

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  walletMoney: 200,
  name: faker.person.fullName().toLowerCase(),
  email: faker.internet.email().toLowerCase(),
  password,
  address: 'ADDRESS_NOT_SET',
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
