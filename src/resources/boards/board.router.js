const HttpStatus = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const boardSchema = require('./board.schema');
const { validateSchema } = require('./board.validation');

router
  .route('/')

  .get(async (req, res) => {
    try {
      const boards = await boardsService.getAll();
      res.json(boards.map(Board.toResponse));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error', description: error.message });
    }
  })

  .post(validateSchema(boardSchema), async (req, res) => {
    try {
      const board = await boardsService.create(req.body);
      res.json(Board.toResponse(board));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error', description: error.message });
    }
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    try {
      const { boardId } = req.params;
      const board = await boardsService.getOne(boardId);
      if (!board) {
        return res.status(404).json({ status: 'error', message: 'Not found' });
      }
      res.json(Board.toResponse(board));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error', description: error.message });
    }
  })

  .put(validateSchema(boardSchema), async (req, res) => {
    try {
      const { boardId } = req.params;
      const board = await boardsService.update(req.body, boardId);
      res.json(Board.toResponse(board));
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error', description: error.message });
    }
  })

  .delete(async (req, res) => {
    try {
      const { boardId } = req.params;
      await tasksService.removeByBoardId(boardId);
      await boardsService.remove(boardId);
      res.json({ status: 'OK' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error', description: error.message });
    }
  });

module.exports = router;
