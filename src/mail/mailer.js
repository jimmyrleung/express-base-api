const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { logger, amqp } = require('../util');
const { amqpConstants } = require('../constants');

const createTransporter = async () => {
  // TODO: Create a real mail account and delete the following row
  const testAccount = await nodemailer.createTestAccount();

  // TODO: Then, replace these options with a real SMTP Transport configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  return transporter;
};

const readTemplate = async templateName => {
  const read = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileAsString) => {
      if (err) return reject(err);
      return resolve(fileAsString);
    });
  });

  const templatePath = await path.resolve(__dirname, 'templates', `${templateName}.html`);
  const template = await read(templatePath);

  return template;
};

const replaceParams = (originalTemplate, data) => {
  let template = originalTemplate;

  Object.keys(data).forEach(key => {
    template = template.replace(`{{${key}}}`, data[key]);
  });

  return template;
};

const send = async (mailInfo, data) => {
  try {
    const transporter = await createTransporter();
    const template = replaceParams(await readTemplate(mailInfo.template), data);
    const result = await transporter.sendMail({
      from: transporter.transporter.auth.user,
      to: mailInfo.address,
      subject: mailInfo.subject,
      html: template,
    });

    logger.info(`Mail successfully sent to ${mailInfo.address} with the subject ${mailInfo.subject}. Result: ${JSON.stringify(result)}.`);
  } catch (err) {
    logger.error(`An error occurred while trying to send the email to ${mailInfo.address} with the subject ${mailInfo.subject}`, err);
    throw err;
  }
};

const registerConsumer = async () => {
  await amqp.consume(amqpConstants.MAILER_QUEUE, true,
    async (message, done) => {
      // convert the buffer to stringmailer.send
      const {
        address,
        subject,
        template,
        data,
      } = JSON.parse(message.content.toString());

      await send({
        address,
        subject,
        template, // the html file inside "mail/templates"
      }, data);

      done();
    });
};

module.exports = {
  send,
  registerConsumer,
};
