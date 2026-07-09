// src/security/permissions.js

import env from "../config/env.js";

export const PERMISSIONS = Object.freeze({
  EXECUTE_SQL: "execute_sql",
  EXECUTE_PROCEDURE: "execute_procedure",
  EXECUTE_FUNCTION: "execute_function",

  SELECT: "select",
  INSERT: "insert",
  UPDATE: "update",
  DELETE: "delete",

  METADATA: "metadata",

  DDL: "ddl",
});

const DEFAULT_PERMISSIONS = new Set([
  PERMISSIONS.SELECT,
  PERMISSIONS.INSERT,
  PERMISSIONS.UPDATE,
  PERMISSIONS.DELETE,

  PERMISSIONS.METADATA,

  PERMISSIONS.EXECUTE_SQL,
  PERMISSIONS.EXECUTE_PROCEDURE,
  PERMISSIONS.EXECUTE_FUNCTION,
]);

/**
 * Check whether a permission is allowed.
 *
 * @param {string} permission
 * @returns {boolean}
 */
export function hasPermission(permission) {
  // In read-only mode, only allow read operations.
  if (env.readOnly) {
    return [
      PERMISSIONS.SELECT,
      PERMISSIONS.METADATA,
    ].includes(permission);
  }

  return DEFAULT_PERMISSIONS.has(permission);
}

export default {
  PERMISSIONS,
  hasPermission,
};
