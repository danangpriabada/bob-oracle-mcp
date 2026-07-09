// src/middleware/audit.js

import logger from "../config/logger.js";

/**
 * Execute a function with audit logging.
 *
 * @param {Object} options
 * @param {string} options.tool
 * @param {Object} options.input
 * @param {Function} options.handler
 */
export async function withAudit({
  tool,
  input = {},
  handler,
}) {
  const start = Date.now();

  logger.info({
    event: "tool.start",
    tool,
    input,
  });

  try {
    const result = await handler();

    logger.info({
      event: "tool.success",
      tool,
      durationMs: Date.now() - start,
    });

    return result;
  } catch (error) {
    logger.error({
      event: "tool.error",
      tool,
      durationMs: Date.now() - start,
      error: {
        name: error.name,
        code: error.code,
        message: error.message,
      },
    });

    throw error;
  }
}
