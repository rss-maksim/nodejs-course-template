const mongoose = require('mongoose');
const uuid = require('uuid');
const { pick } = require('ramda');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  { timestamps: true }
);

userSchema.statics.toResponse = user => {
  const { _id: id } = user;
  return {
    id,
    ...pick(['name', 'login'], user)
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
