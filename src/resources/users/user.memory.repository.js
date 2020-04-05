// @todo: Remove it later (after setting up db)
let users = [
  {
    id: 'e6054355-d5d2-4f23-a010-9e49f1dd047f',
    name: 'Maksim',
    login: 'maksim',
    password: 'pass'
  }
];

const getAll = async () => {
  return users;
};

const getOne = async id => {
  return users.find(user => user.id === id);
};

const create = async payload => {
  users = [...users, payload];
  return payload;
};

const update = async (payload, id) => {
  users = users.map(user => (user.id === id ? { ...user, ...payload } : user));
  return { id, ...payload };
};

const remove = async id => {
  users = users.filter(user => user.id !== id);
  return id;
};

module.exports = { getAll, getOne, create, update, remove };
