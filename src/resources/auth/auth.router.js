const router = require('express').Router();
const authService = require('./auth.service');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await authService.getUser(req.body);
    console.log('router.route', user);
    if (user) {
      return res.json({ token: await authService.createToken(user) });
    }
    res.status(403).json({ status: 403, message: 'Forbidden' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
