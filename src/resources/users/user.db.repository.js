const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getOne = async id => {
  const user = await User.findOne({ _id: id }).exec();
  return user;
};

const create = async user => User.create(user);

const update = async (user, id) => {
  return User.updateOne({ _id: id }, user);
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getOne, create, update, remove };
