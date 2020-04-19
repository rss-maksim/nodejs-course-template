const tasksDb = require('./task.db.repository');

const getAll = boardId => tasksDb.getAll(boardId);

const getOne = id => tasksDb.getOne(id);

const create = task => tasksDb.create(task);

const update = (task, id) => tasksDb.update(task, id);

const remove = id => tasksDb.remove(id);

const removeByBoardId = boardId => tasksDb.removeByBoardId(boardId);

const unassignUser = userId => tasksDb.unassignUser(userId);

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  removeByBoardId,
  unassignUser
};
