const User = require('./User');
const userService = require('./userService');
const { CustomErrorHandler } = require('../../util');
const { userConstants } = require('../../constants');

const create = async (req, res) => {
  const user = new User(req.body);

  if (!await user.isValid()) {
    return res.status(400).json({
      errors: user.errors,
    });
  }

  try {
    await userService.create(user.values);
    return res.status(201).json();
  } catch (err) {
    console.log(userConstants.CREATE_USER_ERROR_MESSAGE, err);
    return CustomErrorHandler.handle(err, res);
  }
};

module.exports = {
  create,
};
