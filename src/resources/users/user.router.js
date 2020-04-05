const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const userSchema = require('./user.schema');
const {
  validateSchema,
  validateExistence,
  validateUnique
} = require('./user.validation');

router
  .route('/')

  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })

  .post(validateSchema(userSchema), validateUnique, async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(validateExistence, async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getOne(id);
    res.json(User.toResponse(user));
  })

  .put(validateSchema(userSchema), validateExistence, async (req, res) => {
    const { id } = req.params;
    const user = await usersService.update(req.body, id);
    return res.json(User.toResponse(user));
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id);
    res.status(200).json({ status: 'ok' });
  });

module.exports = router;
