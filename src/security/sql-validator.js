// src/security/sql-validator.js

import ValidationError from "../exceptions/ValidationError.js";

const ALLOWED_STATEMENTS = new Set([
  "SELECT",
  "WITH",
  "INSERT",
  "UPDATE",
  "DELETE",
  "MERGE",
  "EXPLAIN",
]);

const FORBIDDEN_KEYWORDS = [
  "ALTER",
  "DROP",
  "TRUNCATE",
  "CREATE",
  "GRANT",
  "REVOKE",
  "COMMENT",
  "FLASHBACK",
  "PURGE",
  "SHUTDOWN",
  "STARTUP",
  "AUDIT",
  "NOAUDIT",
];

function normalize(sql) {
  return sql
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstKeyword(sql) {
  return normalize(sql)
    .replace(/^\(+/, "")
    .split(/\s+/)[0]
    .toUpperCase();
}

/**
 * Validate SQL before execution.
 *
 * @param {string} sql
 * @returns {string}
 */
export function validateSql(sql) {
  if (!sql || typeof sql !== "string") {
    throw new ValidationError("SQL statement is required.");
  }

  const normalized = normalize(sql);

  // Prevent multiple SQL statements
  if (normalized.includes(";")) {
    throw new ValidationError(
      "Only one SQL statement is allowed."
    );
  }

  // Reject SQL comments
  if (/--|\/\*/.test(normalized)) {
    throw new ValidationError(
      "SQL comments are not allowed."
    );
  }

  const statement = firstKeyword(normalized);

  if (!ALLOWED_STATEMENTS.has(statement)) {
    throw new ValidationError(
      `Unsupported SQL statement '${statement}'.`
    );
  }

  for (const keyword of FORBIDDEN_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, "i");

    if (regex.test(normalized)) {
      throw new ValidationError(
        `Forbidden SQL keyword '${keyword}'.`
      );
    }
  }

  return normalized;
}

export default {
  validateSql,
};
