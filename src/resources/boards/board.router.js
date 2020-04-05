const router = require('express').Router({ mergeParams: true });
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const boardSchema = require('./board.schema');
const { validateSchema } = require('./board.validation');

router
  .route('/')

  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })

  .post(validateSchema(boardSchema), async (req, res) => {
    const board = await boardsService.create(req.body);
    res.json(Board.toResponse(board));
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getOne(boardId);
    if (!board) {
      return res.status(404).json({ status: 'error', message: 'Not found' });
    }
    res.json(Board.toResponse(board));
  })

  .put(validateSchema(boardSchema), async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.update(req.body, boardId);
    return res.json(Board.toResponse(board));
  })

  .delete(async (req, res) => {
    const { boardId } = req.params;
    await tasksService.removeByBoardId(boardId);
    await boardsService.remove(boardId);
    res.status(200).json({ status: 'ok' });
  });

module.exports = router;
