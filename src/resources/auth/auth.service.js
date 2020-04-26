const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const { getOne, getOneByLogin } = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

const getUser = async ({ login, password }) => {
  const user = await getOneByLogin(login);
  if (!user) {
    return null;
  }
  const canLogin = await bcrypt.compare(password, user.password);
  return canLogin ? user : null;
};

const createToken = async ({ _id, login }) =>
  sign({ userId: _id, login }, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });

const verifyToken = async token => {
  // eslint-disable-next-line no-useless-catch
  try {
    const decoded = await verify(token, JWT_SECRET_KEY);
    const user = await getOne(decoded.userId);
    return Boolean(user);
  } catch {
    throw new Error('Invalid token');
  }
};

module.exports = { getUser, createToken, verifyToken };
