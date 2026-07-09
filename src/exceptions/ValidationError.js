// src/exceptions/ValidationError.js

import AppError from "./AppError.js";

export default class ValidationError extends AppError {
  /**
   * @param {string} message
   * @param {Array<Object>} details
   */
  constructor(
    message = "Validation failed.",
    details = []
  ) {
    super(message, {
      code: "VALIDATION_ERROR",
      statusCode: 400,
    });

    this.details = Array.isArray(details)
      ? details
      : [];
  }

  /**
   * Serialize the error.
   */
  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}