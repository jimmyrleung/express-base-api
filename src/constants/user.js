const USER_NAME_MIN_LENGTH = 3;
const USER_NAME_MAX_LENGTH = 50;

module.exports = {
  USER_NAME_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,

  USER_NAME_REQUIRED_MESSAGE: 'The field \'name\' is required.',
  USER_NAME_MIN_LENGTH_MESSAGE: `The field 'name' must have at least ${USER_NAME_MIN_LENGTH} characters.`,
  USER_NAME_MAX_LENGTH_MESSAGE: `The field 'name' must have at most ${USER_NAME_MAX_LENGTH} characters.`,

  USER_EMAIL_REQUIRED_MESSAGE: 'The field \'email\' is required.',
  USER_EMAIL_FORMAT_MESSAGE: 'The field \'email\' isn\'t in a valid format.',

  USER_PASSWORD_REQUIRED_MESSAGE: 'The field \'password\' is required.',

  CREATE_USER_ERROR_MESSAGE: 'Couldn\'t create a new user.',
};
