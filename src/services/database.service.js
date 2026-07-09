// src/services/database.service.js

import oracle from "../adapters/oracle.adapter.js";

import readOnly from "../security/readonly.js";
import permissions, {
  PERMISSIONS,
} from "../security/permissions.js";
import sqlValidator from "../security/sql-validator.js";

class DatabaseService {
  /**
   * Execute SQL.
   *
   * @param {string} sql
   * @param {Object} binds
   * @param {Object} options
   */
  async execute(sql, binds = {}, options = {}) {
    if (!permissions.hasPermission(PERMISSIONS.EXECUTE_SQL)) {
      throw new Error("SQL execution is disabled.");
    }

    const validatedSql = sqlValidator.validateSql(sql);

    readOnly.enforceReadOnly(validatedSql);

    return oracle.execute(validatedSql, binds, options);
  }

  /**
   * Execute multiple statements.
   *
   * @param {string} sql
   * @param {Array} binds
   * @param {Object} options
   */
  async executeMany(sql, binds = [], options = {}) {
    if (!permissions.hasPermission(PERMISSIONS.EXECUTE_SQL)) {
      throw new Error("SQL execution is disabled.");
    }

    const validatedSql = sqlValidator.validateSql(sql);

    readOnly.enforceReadOnly(validatedSql);

    return oracle.executeMany(validatedSql, binds, options);
  }

  /**
   * Check database connectivity.
   */
  async ping() {
    return oracle.ping();
  }

  /**
   * Check database health.
   */
  async health() {
    try {
      await oracle.ping();

      return {
        status: "UP",
        database: "Oracle",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: "DOWN",
        database: "Oracle",
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }

  /**
   * Explain execution plan.
   */
  async explain(sql) {
    if (typeof oracle.explain !== "function") {
      throw new Error("Explain plan is not implemented by the Oracle adapter.");
    }

    const validatedSql = sqlValidator.validateSql(sql);

    readOnly.enforceReadOnly(validatedSql);

    return oracle.explain(validatedSql);
  }
}

export default new DatabaseService();
