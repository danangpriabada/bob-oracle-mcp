// src/exceptions/DatabaseError.js

import AppError from "./AppError.js";

export default class DatabaseError extends AppError {
  /**
   * @param {string} message
   * @param {Error|null} cause
   */
  constructor(
    message = "Database operation failed.",
    cause = null
  ) {
    super(message, {
      code: "DATABASE_ERROR",
      statusCode: 500,
      cause,
    });

    this.oracle = cause
      ? {
          code: cause.code ?? null,
          errorNum: cause.errorNum ?? null,
          offset: cause.offset ?? null,
        }
      : null;
  }

  /**
   * Serialize the error.
   */
  toJSON() {
    return {
      ...super.toJSON(),
      oracle: this.oracle,
    };
  }
}
