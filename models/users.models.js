const mongoose = require('mongoose');
const validator = require('validator');
const config = require('../config/config.js');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
    },
    password: {
      type: String,
      validate: (value) => {
        if (
          !value.match(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$'
          )
        ) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
    },
    walletMoney: {
      type: Number,
      required: true,
      default: config.default_wallet_money,
    },
    address: {
      type: String,
      default: config.default_address,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.static.isEmailTaken = async function (email) {
  const emailFind = await userSchema.find({ email });
  if (emailFind) return true;
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
