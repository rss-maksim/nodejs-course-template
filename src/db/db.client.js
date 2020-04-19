const mongoose = require('mongoose');
const config = require('../common/config');

const connect = cb => {
  mongoose.connect(config.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // @todo: remove later
    // db.dropDatabase();
    console.log('DB connected!');
    cb();
  });
};

module.exports = connect;
