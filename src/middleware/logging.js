// src/middleware/logging.js

import logger from "../config/logger.js";

/**
 * Execute a function with execution logging.
 *
 * @param {Object} options
 * @param {string} options.name
 * @param {Function} options.handler
 * @returns {Promise<*>}
 */
export async function withLogging({
  name,
  handler,
}) {
  const start = process.hrtime.bigint();

  logger.debug({
    event: "execution.start",
    name,
  });

  try {
    const result = await handler();

    const durationMs =
      Number(process.hrtime.bigint() - start) / 1_000_000;

    logger.info({
      event: "execution.success",
      name,
      durationMs: Number(durationMs.toFixed(3)),
    });

    return result;
  } catch (error) {
    const durationMs =
      Number(process.hrtime.bigint() - start) / 1_000_000;

    logger.error({
      event: "execution.failed",
      name,
      durationMs: Number(durationMs.toFixed(3)),
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
      },
    });

    throw error;
  }
}
