// src/utils/logger.js

/**
 * Build a standard log context.
 *
 * @param {Object} options
 * @param {string} [options.requestId]
 * @param {string} [options.tool]
 * @param {string} [options.operation]
 * @param {string} [options.user]
 * @returns {Object}
 */
export function createLogContext({
  requestId,
  tool,
  operation,
  user,
} = {}) {
  return {
    requestId,
    tool,
    operation,
    user,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Measure execution time.
 *
 * @returns {{stop: () => number}}
 */
export function createTimer() {
  const start = process.hrtime.bigint();

  return {
    stop() {
      const end = process.hrtime.bigint();

      return Number(end - start) / 1_000_000;
    },
  };
}
