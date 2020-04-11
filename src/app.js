const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const loggerMiddleware = require('./common/middlewares/log');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { errorLogger } = require('./logger');
const {
  handleError,
  handleInternalServerError
} = require('./common/middlewares');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(loggerMiddleware);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(handleError).use(handleInternalServerError);

process.on('unhandledRejection', reason => {
  errorLogger.error({
    text: reason.message,
    label: 'Unhandled Rejection',
    statusCode: INTERNAL_SERVER_ERROR
  });
});

process.on('uncaughtException', error => {
  errorLogger.error({
    text: error.message,
    label: 'Uncaught Exception',
    statusCode: INTERNAL_SERVER_ERROR
  });
});

module.exports = app;
