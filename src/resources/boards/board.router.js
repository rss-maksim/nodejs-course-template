const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

// const boardSchema = require('./board.schema');
// const { validateSchema } = require('./board.validation');

router
  .route('/')

  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })

  .post(
    /* validateSchema(boardSchema),*/ async (req, res) => {
      const board = await boardsService.create(req.body);
      res.json(Board.toResponse(board));
    }
  );

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getOne(id);
    if (!board) {
      return res.status(404).json({ status: 'error', message: 'Not found' });
    }
    res.json(Board.toResponse(board));
  })

  .put(
    /* validateSchema(boardSchema), */ async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.update(req.body, id);
      return res.json(Board.toResponse(board));
    }
  )

  .delete(async (req, res) => {
    const { id } = req.params;
    console.log('board delete', { id });
    await tasksService.removeByBoardId(id);
    await boardsService.remove(id);
    res.status(200).json({ status: 'ok' });
  });

module.exports = router;
