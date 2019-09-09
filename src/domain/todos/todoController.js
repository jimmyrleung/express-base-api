const Todo = require('./Todo');
const todoService = require('./todoService');
const { todoConstants } = require('../../constants');
const { CustomErrorHandler } = require('../../util');

const getAll = async (req, res) => {
  const { _id } = req.user;

  try {
    const todos = await todoService.findAllByUserId(_id);
    res.json(todos);
  } catch (err) {
    req.logger.error(todoConstants.TODO_FIND_ALL_BY_USER_ERR_MESSAGE, err);
    CustomErrorHandler.handle(err, res);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { populateUser } = req.query;

  try {
    const todo = await todoService
      .findOneByUserId(id, userId, populateUser || false);

    res.json(todo);
  } catch (err) {
    req.logger.error(todoConstants.TODO_FIND_ONE_BY_USER_ERR_MESSAGE, err);
    CustomErrorHandler.handle(err, res);
  }
};

const create = async (req, res) => {
  const todo = new Todo(req.body);
  const { _id } = req.user;

  if (!await todo.isValid()) {
    return res.status(400).json({
      errors: todo.errors,
    });
  }

  try {
    await todoService.create(todo.values, _id);
    return res.status(201).json();
  } catch (err) {
    req.logger.error(todoConstants.TODO_CREATE_ERR_MESSAGE, err);
    return CustomErrorHandler.handle(err, res);
  }
};

const deleteById = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  try {
    await todoService.deleteOneByUserId(id, userId);
    return res.status(204).json();
  } catch (err) {
    req.logger.error(todoConstants.TODO_DELETE_ERR_MESSAGE, err);
    return CustomErrorHandler.handle(err, res);
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const todo = new Todo(req.body);

  if (!await todo.isValid()) {
    return res.status(400).json({
      errors: todo.errors,
    });
  }

  try {
    await todoService.updateOneByUserId(id, userId, todo.values);
    return res.status(204).json();
  } catch (err) {
    req.logger.error(todoConstants.TODO_UPDATE_ERR_MESSAGE, err);
    return CustomErrorHandler.handle(err, res);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
