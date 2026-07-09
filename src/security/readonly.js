// src/security/readonly.js

import env from "../config/env.js";
import ValidationError from "../exceptions/ValidationError.js";

const READ_ONLY_OPERATIONS = new Set([
  "SELECT",
  "WITH",
  "EXPLAIN",
]);

const WRITE_OPERATIONS = new Set([
  "INSERT",
  "UPDATE",
  "DELETE",
  "MERGE",
  "UPSERT",
  "CREATE",
  "ALTER",
  "DROP",
  "TRUNCATE",
  "RENAME",
  "GRANT",
  "REVOKE",
  "COMMENT",
]);

/**
 * Returns the first SQL keyword.
 *
 * @param {string} sql
 * @returns {string}
 */
function getOperation(sql) {
  return sql
    .trim()
    .replace(/^\(+/, "")
    .split(/\s+/)[0]
    .toUpperCase();
}

/**
 * Validate SQL against READ_ONLY mode.
 *
 * @param {string} sql
 */
export function enforceReadOnly(sql) {
  if (!env.readOnly) {
    return;
  }

  const operation = getOperation(sql);

  if (READ_ONLY_OPERATIONS.has(operation)) {
    return;
  }

  if (WRITE_OPERATIONS.has(operation)) {
    throw new ValidationError(
      `READ_ONLY mode does not allow '${operation}' statements.`
    );
  }

  throw new ValidationError(
    `Unsupported SQL operation '${operation}'.`
  );
}

export default {
  enforceReadOnly,
};
