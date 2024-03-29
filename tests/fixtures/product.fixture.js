const mongoose = require('mongoose');
const { Product } = require('../../models/product.model');

const productOne = {
  _id: new mongoose.Types.ObjectId(),
  name: 'bat',
  category: 'Sports',
  rating: 3,
  cost: 20,
  image: 'google.com',
};

const productTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: 'ball',
  category: 'Sports',
  rating: 3,
  cost: 5,
  image: 'google.com',
};

const insertProducts = async (products) => {
  await Product.insertMany(products);
};

module.exports = {
  productOne,
  productTwo,
  insertProducts,
};
