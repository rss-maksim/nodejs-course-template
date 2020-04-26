const bcrypt = require('bcrypt');

const usersDb = require('./user.db.repository');

const saltRounds = 10;

const getAll = () => usersDb.getAll();

const getOne = id => usersDb.getOne(id);

const getOneByLogin = login => usersDb.getOneByLogin(login);

const create = async user => {
  const hash = await bcrypt.hash(user.password, saltRounds);
  return usersDb.create({ ...user, password: hash });
};

const update = (payload, id) => usersDb.update(payload, id);

const remove = id => usersDb.remove(id);

const isUnique = async payload => {
  const user = await getOneByLogin(payload.login);
  return !user;
};

module.exports = {
  getAll,
  getOne,
  getOneByLogin,
  create,
  update,
  remove,
  isUnique
};
