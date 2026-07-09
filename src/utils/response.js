// src/utils/response.js

/**
 * Create a successful response.
 *
 * @param {*} data
 * @param {Object} metadata
 * @returns {Object}
 */
export function success(data = null, metadata = {}) {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
}

/**
 * Create an error response.
 *
 * @param {Error} error
 * @returns {Object}
 */
export function failure(error) {
  return {
    success: false,
    error: {
      name: error.name,
      code: error.code ?? "INTERNAL_SERVER_ERROR",
      message: error.message,
      statusCode: error.statusCode ?? 500,
    },
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Create a paginated response.
 *
 * @param {Array} items
 * @param {Object} pagination
 * @returns {Object}
 */
export function paginated(items = [], pagination = {}) {
  return success(items, {
    pagination,
  });
}

export default {
  success,
  failure,
  paginated,
};
