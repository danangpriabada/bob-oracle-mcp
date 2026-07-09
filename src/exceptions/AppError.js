// src/exceptions/AppError.js

export default class AppError extends Error {
  /**
   * @param {string} message
   * @param {Object} [options]
   * @param {string} [options.code]
   * @param {number} [options.statusCode]
   * @param {Error|null} [options.cause]
   * @param {boolean} [options.isOperational]
   */
  constructor(
    message = "Application error.",
    {
      code = "APP_ERROR",
      statusCode = 500,
      cause = null,
      isOperational = true,
    } = {}
  ) {
    super(message, cause ? { cause } : undefined);

    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.cause = cause;

    Error.captureStackTrace?.(
      this,
      this.constructor
    );
  }

  /**
   * Serialize the error.
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
    };
  }
}