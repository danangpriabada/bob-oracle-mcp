// src/middleware/error-handler.js

import AppError from "../exceptions/AppError.js";
import DatabaseError from "../exceptions/DatabaseError.js";
import ValidationError from "../exceptions/ValidationError.js";
import logger from "../config/logger.js";

/**
 * Normalize application errors.
 *
 * @param {Error} error
 * @returns {AppError}
 */
export function handleError(error) {
  if (error instanceof AppError) {
    logger.error({
      name: error.name,
      code: error.code,
      message: error.message,
    });

    return error;
  }

  logger.error({
    name: error.name,
    message: error.message,
    stack: error.stack,
  });

  return new AppError("Internal server error.", {
    code: "INTERNAL_SERVER_ERROR",
    statusCode: 500,
    cause: error,
  });
}

/**
 * Convert an error into a response payload.
 *
 * @param {Error} error
 * @returns {Object}
 */
export function errorResponse(error) {
  const appError = handleError(error);

  return {
    success: false,
    error: {
      name: appError.name,
      code: appError.code,
      message: appError.message,
      statusCode: appError.statusCode,
    },
  };
}
