const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
// const boardsService = require('../boards/board.service');
// const tasksSchema = require('./task.schema');
// const { validateSchema } = require('./task.validation');

router
  .route('/:boardId/tasks')

  .get(async (req, res) => {
    const { boardId } = req.params;
    // const board = await boardsService.getOne(boardId);
    // if (!board) {
    //   return res.status(404).json({ status: 'error', message: 'Not found' });
    // }
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  })

  .post(
    /* validateSchema(tasksSchema),*/ async (req, res) => {
      const task = await tasksService.create(req.body);
      res.json(Task.toResponse(task));
    }
  );

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.getOne(id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Not found' });
    }
    res.json(Task.toResponse(task));
  })

  .put(
    /* validateSchema(tasksSchema),*/ async (req, res) => {
      const { id } = req.params;
      const task = await tasksService.update(req.body, id);
      return res.json(Task.toResponse(task));
    }
  )

  .delete(async (req, res) => {
    const { id } = req.params;
    await tasksService.remove(id);
    res.status(200).json({ status: 'ok' });
  });

module.exports = router;
