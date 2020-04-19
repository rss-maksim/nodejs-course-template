const boardsDb = require('./board.db.repository');

const getAll = () => boardsDb.getAll();

const getOne = id => boardsDb.getOne(id);

const create = board => boardsDb.create(board);

const update = (payload, id) => boardsDb.update(payload, id);

const remove = id => boardsDb.remove(id);

module.exports = { getAll, getOne, create, update, remove };
