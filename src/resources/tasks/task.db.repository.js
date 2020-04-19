const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getOne = async id => {
  const task = await Task.findOne({ _id: id }).exec();
  return task;
};

const create = async task => Task.create(task);

const update = async (task, id) => {
  return Task.updateOne({ _id: id }, task);
};

const remove = async id => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

const removeByBoardId = async boardId => {
  return (await Task.deleteMany({ boardId })).deletedCount;
};

const unassignUser = async userId => {
  return (await Task.updateMany({ userId }, { userId: null })).nModified;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  removeByBoardId,
  unassignUser
};
