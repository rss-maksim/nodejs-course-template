const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};
