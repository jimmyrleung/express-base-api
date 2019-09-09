const mongoose = require('mongoose');
const { todoConstants } = require('../../constants');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: todoConstants.TODO_NAME_MIN_LENGTH,
    maxlength: todoConstants.TODO_NAME_MAX_LENGTH,
  },
  description: {
    type: String,
    required: true,
    minlength: todoConstants.TODO_DESCRIPTION_MIN_LENGTH,
    maxlength: todoConstants.TODO_DESCRIPTION_MAX_LENGTH,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
});

const TodoModel = mongoose.model('Todos', todoSchema, 'todos');

module.exports = TodoModel;
