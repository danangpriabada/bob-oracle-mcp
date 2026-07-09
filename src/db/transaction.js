// src/db/transaction.js

import pool from "./pool.js";
import logger from "../config/logger.js";

class TransactionManager {
  /**
   * Begin a new transaction.
   *
   * @returns {Promise<import("oracledb").Connection>}
   */
  async begin() {
    const connection = await pool.getConnection();

    logger.debug("Transaction started.");

    return connection;
  }

  /**
   * Commit the current transaction.
   *
   * @param {import("oracledb").Connection} connection
   */
  async commit(connection) {
    if (!connection) {
      throw new Error("Connection is required.");
    }

    try {
      await connection.commit();

      logger.debug("Transaction committed.");
    } finally {
      await connection.close();
    }
  }

  /**
   * Rollback the current transaction.
   *
   * @param {import("oracledb").Connection} connection
   */
  async rollback(connection) {
    if (!connection) {
      throw new Error("Connection is required.");
    }

    try {
      await connection.rollback();

      logger.debug("Transaction rolled back.");
    } finally {
      await connection.close();
    }
  }

  /**
   * Close the connection without commit or rollback.
   *
   * Useful for read-only operations.
   *
   * @param {import("oracledb").Connection} connection
   */
  async close(connection) {
    if (connection) {
      await connection.close();
    }
  }
}

export default new TransactionManager();
