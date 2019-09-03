module.exports = class CustomError extends Error {
  constructor(message, code, errorCode) {
    super();
    Error.captureStackTrace(this, this.constructor);
    
    this.name = this.constructor.name;
    this.message = message || "Internal server error";
    this.code = code || 500;
    this.errorCode = errorCode ? errorCode : null
  };
}