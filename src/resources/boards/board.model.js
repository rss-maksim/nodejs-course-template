const mongoose = require('mongoose');
const uuid = require('uuid');
const { pick } = require('ramda');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: Array
  },
  { timestamps: true }
);

boardSchema.statics.toResponse = board => {
  const { _id: id } = board;
  return { id, ...pick(['title', 'columns'], board) };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
