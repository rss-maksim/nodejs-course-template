const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const getOne = id => boardsRepo.getOne(id);

const create = board => boardsRepo.create(new Board({ ...board }));

const update = (payload, id) => boardsRepo.update(payload, id);

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, getOne, create, update, remove };
