const TodoModel = require('./TodoModel');
const { CustomError } = require('../../util');

const findProjection = '_id name description';

const create = async (todo, userId) => {
  const newTodo = new TodoModel({
    ...todo,
    user: userId,
  });

  await newTodo.save();
};

const findAllByUserId = async userId => TodoModel
  .find({ user: userId })
  .select(findProjection);

const findOneByUserId = async (_id, userId, populateUser = false) => {
  const todo = await TodoModel
    .findOne({ _id, user: userId })
    .select(findProjection);

  if (!todo) throw new CustomError(`To do with id ${_id} not found.`, 404);

  return populateUser ? todo.populate('user') : todo;
};

const deleteOneByUserId = async (_id, userId) => {
  const todo = await TodoModel.findOneAndDelete({ _id, user: userId });
  if (!todo) throw new CustomError(`To do with id ${_id} not found.`, 404);
};

const updateOneByUserId = async (_id, userId, newValues) => {
  const todo = await findOneByUserId(_id, userId, false);

  Object.keys(newValues).forEach(k => {
    todo[k] = newValues[k];
  });

  todo.save();
};

module.exports = {
  create,
  findAllByUserId,
  findOneByUserId,
  deleteOneByUserId,
  updateOneByUserId,
};
