// src/bootstrap/logger.js

import logger from "../config/logger.js";

/**
 * Initialize application logger.
 */
export async function initializeLogger() {
  try {
    logger.info("Logger initialized.");

    return logger;
  } catch (error) {
    console.error("Failed to initialize logger.", error);
    throw error;
  }
}
