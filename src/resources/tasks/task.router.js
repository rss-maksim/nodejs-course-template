const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service');
const tasksSchema = require('./task.schema');
const { validateSchema } = require('./task.validation');

router
  .route('/:boardId/tasks')

  .get(async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const board = await boardsService.getOne(boardId);
      if (!board) {
        return res.status(404).json({ status: 'error', message: 'Not found' });
      }
      const tasks = await tasksService.getAll(boardId);
      res.json(tasks.map(Task.toResponse));
    } catch (error) {
      return next(error);
    }
  })

  .post(validateSchema(tasksSchema), async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const task = await tasksService.create({ ...req.body, boardId });
      res.json(Task.toResponse(task));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await tasksService.getOne(taskId);
      if (!task) {
        return res.status(404).json({ status: 'error', message: 'Not found' });
      }
      res.json(Task.toResponse(task));
    } catch (error) {
      return next(error);
    }
  })

  .put(validateSchema(tasksSchema), async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await tasksService.update(req.body, taskId);
      res.json(Task.toResponse(task));
    } catch (error) {
      return next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const { taskId } = req.params;
      await tasksService.remove(taskId);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
