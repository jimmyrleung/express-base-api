const moment = require('moment');
const Auth = require('./Auth');
const authService = require('./authService');
const { CustomErrorHandler } = require('../../util');
const mailer = require('../../mail/mailer');

const login = async (req, res) => {
  const credentials = new Auth(req.body);

  if (!await credentials.isValid()) {
    return res.status(400).json({
      errors: credentials.errors,
    });
  }

  try {
    const { token, name, email } = await authService.login(credentials.values);
    res.json({ token });

    return mailer.send({
      address: email,
      subject: 'New account login',
      template: 'login', // the html file inside "mail/templates"
    }, {
      name,
      loginDateString: moment.utc().format('DD/MM/YYYY HH:mm:ss'),
    });
  } catch (err) {
    req.logger.error('Couldn\'t log the user in.', err);
    return CustomErrorHandler.handle(err, res);
  }
};

module.exports = {
  login,
};
