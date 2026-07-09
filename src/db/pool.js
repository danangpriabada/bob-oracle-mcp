// src/db/pool.js

import oracledb from "oracledb";

import databaseConfig from "../config/database.js";
import logger from "../config/logger.js";

class OraclePool {
  constructor() {
    this.pool = null;
  }

  /**
   * Initialize the Oracle connection pool.
   */
  async initialize() {
    if (this.pool) {
      logger.warn("Oracle connection pool is already initialized.");
      return this.pool;
    }

    this.pool = await oracledb.createPool(databaseConfig);

    logger.info("Oracle connection pool created.");

    return this.pool;
  }

  /**
   * Get a connection from the pool.
   */
  async getConnection() {
    if (!this.pool) {
      throw new Error("Oracle connection pool has not been initialized.");
    }

    return this.pool.getConnection();
  }

  /**
   * Close the connection pool.
   */
  async close() {
    if (!this.pool) {
      return;
    }

    await this.pool.close(10);

    logger.info("Oracle connection pool closed.");

    this.pool = null;
  }

  /**
   * Return pool statistics.
   */
  getStatistics() {
    if (!this.pool) {
      return null;
    }

    return {
      connectionsInUse: this.pool.connectionsInUse,
      connectionsOpen: this.pool.connectionsOpen,
      poolMin: this.pool.poolMin,
      poolMax: this.pool.poolMax,
    };
  }

  /**
   * Indicates whether the pool has been initialized.
   */
  isInitialized() {
    return this.pool !== null;
  }
}

export default new OraclePool();
