const Auth = require('./Auth');
const authService = require('./authService');
const { CustomErrorHandler } = require('../../util');

const login = async (req, res) => {
  const credentials = new Auth(req.body);

  if (!await credentials.isValid()) {
    return res.status(400).json({
      errors: credentials.errors,
    });
  }

  try {
    const token = await authService.login(credentials.values);
    return res.json({ token });
  } catch (err) {
    console.log('Couldn\'t log the user in.', err);
    return CustomErrorHandler.handle(err, res);
  }
};

module.exports = {
  login,
};
