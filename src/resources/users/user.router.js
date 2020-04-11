const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const userSchema = require('./user.schema');
const { validateSchema, validateExistence } = require('./user.validation');

router
  .route('/')

  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    } catch (error) {
      return next(error);
    }
  })

  .post(validateSchema(userSchema), async (req, res, next) => {
    try {
      const user = await usersService.create(req.body);
      res.json(User.toResponse(user));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:id')
  .get(validateExistence, async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.getOne(id);
      res.json(User.toResponse(user));
    } catch (error) {
      return next(error);
    }
  })

  .put(
    validateSchema(userSchema),
    validateExistence,
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = await usersService.update(req.body, id);
        res.json(User.toResponse(user));
      } catch (error) {
        return next(error);
      }
    }
  )

  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      await tasksService.unassignUser(id);
      await usersService.remove(id);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
