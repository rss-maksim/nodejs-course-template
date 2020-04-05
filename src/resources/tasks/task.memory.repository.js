let tasks = [
  {
    id: 'e6054355-d5f2-4f23-a050-9e49f9dd047f',
    title: 'Task1',
    order: 1,
    description: 'Yask description',
    userId: 'e6054355-d5d2-4f23-a010-9e49f1dd047f',
    boardId: 'e6054355-d5f2-4f23-a050-9e49f1dd047f',
    columnId: ''
  }
];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getOne = async id => {
  return tasks.find(task => task.id === id);
};

const create = async payload => {
  tasks = [...tasks, payload];
  return payload;
};

const update = async (payload, id) => {
  tasks = tasks.map(task => (task.id === id ? { ...task, ...payload } : task));
  return { id, ...payload };
};

const remove = async id => {
  tasks = tasks.filter(task => task.id !== id);
  return id;
};

const removeByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const unassignUser = userId =>
  tasks.map(task =>
    task.userId === userId ? { ...task, userId: null } : task
  );

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  removeByBoardId,
  unassignUser
};
