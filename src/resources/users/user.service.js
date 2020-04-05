const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getOne = id => usersRepo.getOne(id);

const create = user => usersRepo.create(new User({ ...user }));

const update = (payload, id) => usersRepo.update(payload, id);

const remove = id => usersRepo.remove(id);

const isUnique = async payload => {
  const users = await getAll();
  return !users.some(user => user.login === payload.login);
};

module.exports = { getAll, getOne, create, update, remove, isUnique };
