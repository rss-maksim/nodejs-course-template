const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getOne = async id => {
  const board = await Board.findOne({ _id: id }).exec();
  return board;
};

const create = async board => Board.create(board);

const update = async (board, id) => {
  return Board.updateOne({ _id: id }, board);
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getOne, create, update, remove };
