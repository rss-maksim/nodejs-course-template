const { verifyToken } = require('./auth.service');

const openedUrls = new Set(['/', '/doc', '/login']);

const authGuard = async (req, res, next) => {
  try {
    const { originalUrl } = req;
    if (openedUrls.has(originalUrl)) {
      return next();
    }
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
    const isTokenValid = await verifyToken(authHeader.replace('Bearer ', ''));
    if (isTokenValid) {
      return next();
    }
    res.status(401).json({ status: 401, message: 'Unauthorized' });
  } catch (err) {
    return next(err);
  }
};

module.exports = { authGuard };
