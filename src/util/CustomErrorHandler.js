const CustomError = require('./CustomError');

module.exports = class CustomErrorHandler {
  /**
   * @param {Object} error The thrown error itself
   * @param {Object} res The request pipeline response object
   */
  static handle(error, res) {
    if (error instanceof CustomError) {
      res.status(error.code).json({
        message: error.message,
        errorCode: error.errorCode || null,
      });
    } else {
      res.status(500).json({
        body: { message: error.message },
      });
    }
  }
};
