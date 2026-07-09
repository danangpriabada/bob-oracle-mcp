// src/bootstrap/database.js

import pool from "../db/pool.js";
import logger from "../config/logger.js";

/**
 * Initialize the Oracle connection pool.
 */
export async function initializeDatabase() {
  try {
    await pool.initialize();

    logger.info("Oracle connection pool initialized.");
  } catch (error) {
    logger.error("Failed to initialize Oracle connection pool.", error);
    throw error;
  }
}
