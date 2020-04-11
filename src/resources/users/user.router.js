const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const userSchema = require('./user.schema');
const { validateSchema, validateExistence } = require('./user.validation');

router
  .route('/')

  .get(async (req, res) => {
    try {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  })

  .post(validateSchema(userSchema), async (req, res) => {
    try {
      const user = await usersService.create(req.body);
      res.json(User.toResponse(user));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  });

router
  .route('/:id')
  .get(validateExistence, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersService.getOne(id);
      res.json(User.toResponse(user));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error', description: error.message });
    }
  })

  .put(validateSchema(userSchema), validateExistence, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersService.update(req.body, id);
      res.json(User.toResponse(user));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await tasksService.unassignUser(id);
      await usersService.remove(id);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
