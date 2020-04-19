const mongoose = require('mongoose');
const uuid = require('uuid');
const { pick } = require('ramda');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { timestamps: true }
);

taskSchema.statics.toResponse = task => {
  const { _id: id } = task;
  return {
    id,
    ...pick(
      ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
      task
    )
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
