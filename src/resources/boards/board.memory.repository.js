let boards = [
  {
    id: 'e6054355-d5f2-4f23-a050-9e49f1dd047f',
    title: 'Board1',
    columns: []
  }
];

const getAll = async () => {
  return boards;
};

const getOne = async id => {
  return boards.find(board => board.id === id);
};

const create = async payload => {
  boards = [...boards, payload];
  return payload;
};

const update = async (payload, id) => {
  boards = boards.map(board =>
    board.id === id ? { ...board, ...payload } : board
  );
  return { id, ...payload };
};

const remove = async id => {
  boards = boards.filter(board => board.id !== id);
  return id;
};

module.exports = { getAll, getOne, create, update, remove };
