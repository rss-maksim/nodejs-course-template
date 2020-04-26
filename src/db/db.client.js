const mongoose = require('mongoose');

const config = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const { users, boards, tasks } = require('./mocks');

const connect = cb => {
  mongoose.connect(config.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    // @todo: remove later
    await db.dropDatabase();
    await User.insertMany(users);
    await Board.insertMany(boards);
    await Task.insertMany(tasks);
    console.log('DB connected!');
    cb();
  });
};

module.exports = connect;
