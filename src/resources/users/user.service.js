const usersDb = require('./user.db.repository');

const getAll = () => usersDb.getAll();

const getOne = id => usersDb.getOne(id);

const create = user => usersDb.create(user);

const update = (payload, id) => usersDb.update(payload, id);

const remove = id => usersDb.remove(id);

const isUnique = async payload => {
  const users = await getAll();
  return !users.some(user => user.login === payload.login);
};

module.exports = { getAll, getOne, create, update, remove, isUnique };
