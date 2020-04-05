const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = boardId => tasksRepo.getAll(boardId);

const getOne = id => tasksRepo.getOne(id);

const create = task => tasksRepo.create(new Task({ ...task }));

const update = (payload, id) => tasksRepo.update(payload, id);

const remove = id => tasksRepo.remove(id);

const removeByBoardId = boardId => tasksRepo.removeByBoardId(boardId);

const unassignUser = userId => tasksRepo.unassignUser(userId);

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  removeByBoardId,
  unassignUser
};
