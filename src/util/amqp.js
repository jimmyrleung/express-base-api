const amqp = require('amqplib/callback_api');
const { amqpConfig } = require('../config');
const { amqpConstants } = require('../constants');
const logger = require('./logger');

const connect = () => new Promise((resolve, reject) => {
  amqp.connect(amqpConfig, (err, connection) => {
    if (err) {
      console.log(amqpConstants.CONNECTION_FAILED, err);
      logger.error(amqpConstants.CONNECTION_FAILED, err);
      return reject(err);
    }

    logger.info(amqpConstants.CONNECTION_SUCCEEDED);
    console.log(amqpConstants.CONNECTION_SUCCEEDED);
    return resolve(connection);
  });
});

const createChannel = () => new Promise(async (resolve, reject) => {
  const connection = await connect();

  connection.createChannel((err, channel) => {
    if (err) {
      console.log(amqpConstants.CREATE_CHANNEL_FAILED, err);
      logger.error(amqpConstants.CREATE_CHANNEL_FAILED, err);
      return reject(err);
    }

    logger.info('A new AMQP channel has successfully been created.');
    return resolve({ channel, connection });
  });
});

const send = async (queue, buffer, options) => {
  const { channel, connection } = await createChannel();

  // Our queue will only be created if it doesn't exist already.
  // durable: true ensures that our amqp wil never lose our queue.
  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, buffer, options);

  setTimeout(async () => {
    await connection.close();
  }, 500);
};

const sendRaw = async (queue, data) => {
  // We mark persistent as true because we want to ensure that the task_queue
  // won't be lost even if RabbitMQ restarts.
  // * It doesn't fully guarantee that a message won't be lost because there is
  // * a short time window when RabbitMQ has accepted but still hasn't saved it
  // * on disk yet.
  await send(queue, Buffer.from(data), {
    persistent: true,
  });

  logger.info(`[AMQP]: The raw message ${data} has successfully been sent to queue ${queue}.`);
};

const sendJSON = async (queue, data) => {
  // We mark persistent as true because we want to ensure that the task_queue
  // won't be lost even if RabbitMQ restarts.
  // * It doesn't fully guarantee that a message won't be lost because there is
  // * a short time window when RabbitMQ has accepted but still hasn't saved it
  // * on disk yet.
  const jsonData = JSON.stringify(data);
  await send(queue, Buffer.from(jsonData), {
    persistent: true,
    contentType: 'application/json',
  });

  logger.info(`[AMQP]: The JSON message ${jsonData} has successfully been sent to queue ${queue}.`);
};

const consume = async (queue, receivesJson, callback) => {
  const { channel } = await createChannel();

  // Our queue will only be created if it doesn't exist already.
  // durable: true ensures that our amqp wil never lose our queue.
  channel.assertQueue(queue, { durable: true });

  // Prefetch tells RabbitMQ not to give more than one message to a worker
  // at a time. Or, in other words, don't dispatch a new message to a worker
  // until it has processed and acknowledged the previous one. Instead,
  // will dispatch it to the next worker that is not still busy.
  channel.prefetch(1);
  channel.consume(queue, (message) => {
    logger.info(`[AMQP] Message ${receivesJson ? JSON.stringify(message) : message} sucessfully received from queue ${queue}.`);

    const done = () => {
      channel.ack(message);
    };

    // The message received and the "done" function that must be called;
    callback(message, done);
  }, {
    // If noAck = true, RabbitMQ will delete the message once it has
    // been delivered (even if it hasn't been handled). If an error occurs
    // it will be lost. To avoid that, we set noAck to false, so now we have
    // to manually say when the message has been handled. If any error occurs,
    // RabbitMQ will re-queue or re-deliver it.
    noAck: false,
  });
};

module.exports = {
  connect,
  createChannel,
  sendRaw,
  sendJSON,
  consume,
};
