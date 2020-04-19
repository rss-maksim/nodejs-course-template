const router = require('express').Router({ mergeParams: true });
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const boardSchema = require('./board.schema');
const { validateSchema } = require('./board.validation');

router
  .route('/')

  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAll();
      res.json(boards.map(Board.toResponse));
    } catch (error) {
      return next(error);
    }
  })

  .post(validateSchema(boardSchema), async (req, res, next) => {
    try {
      const board = await boardsService.create(req.body);
      res.json(Board.toResponse(board));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:boardId')
  .get(async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const board = await boardsService.getOne(boardId);
      console.log('board', board);
      if (!board) {
        return res.status(404).json({ status: 'error', message: 'Not found' });
      }
      res.json(Board.toResponse(board));
    } catch (error) {
      return next(error);
    }
  })

  .put(validateSchema(boardSchema), async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const board = await boardsService.update(req.body, boardId);
      res.json(Board.toResponse(board));
    } catch (error) {
      return next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const { boardId } = req.params;
      await tasksService.removeByBoardId(boardId);
      await boardsService.remove(boardId);
      res.json({ status: 'OK' });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
