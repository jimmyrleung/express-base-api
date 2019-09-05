const Auth = require('./Auth');
const moment = require('moment');
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
    const token = await authService.login(credentials.values);
    res.json({ token });

    return mailer.send({
      address: 'jimmy.arfs@gmail.com,jimmy.rl19@hotmail.com',
      subject: 'New account login',
      template: 'login',
    }, {
      name: 'Jimmy Rios Leung',
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
