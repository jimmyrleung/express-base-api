const TODO_NAME_MIN_LENGTH = 3;
const TODO_NAME_MAX_LENGTH = 50;
const TODO_DESCRIPTION_MIN_LENGTH = 3;
const TODO_DESCRIPTION_MAX_LENGTH = 200;

module.exports = {
  TODO_NAME_MIN_LENGTH,
  TODO_NAME_MAX_LENGTH,
  TODO_DESCRIPTION_MIN_LENGTH,
  TODO_DESCRIPTION_MAX_LENGTH,

  TODO_NAME_REQUIRED_MESSAGE: 'The field \'name\' is required.',
  TODO_NAME_MIN_LENGTH_MESSAGE: `The field 'name' must have at least ${TODO_NAME_MIN_LENGTH} characters.`,
  TODO_NAME_MAX_LENGTH_MESSAGE: `The field 'name' must have at most ${TODO_NAME_MAX_LENGTH} characters.`,

  TODO_DESCRIPTION_REQUIRED_MESSAGE: 'The field \'description\' is required.',
  TODO_DESCRIPTION_MIN_LENGTH_MESSAGE: `The field 'description' must have at least ${TODO_DESCRIPTION_MIN_LENGTH} characters.`,
  TODO_DESCRIPTION_MAX_LENGTH_MESSAGE: `The field 'description' must have at most ${TODO_DESCRIPTION_MAX_LENGTH} characters.`,

  TODO_FIND_ALL_BY_USER_ERR_MESSAGE: 'Couln\'t fetch the user\'s to dos.',
  TODO_CREATE_ERR_MESSAGE: 'Couln\'t create a new to do.',
  TODO_DELETE_ERR_MESSAGE: 'Couln\'t delete the passed to do.',
  TODO_UPDATE_ERR_MESSAGE: 'Couln\'t update the passed to do.',
  TODO_FIND_ONE_BY_USER_ERR_MESSAGE: 'Couln\'t fetch the user\'s specific to do.',
};
