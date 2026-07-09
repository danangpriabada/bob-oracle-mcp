// src/server.js

import { createApplication } from "./app.js";

import logger from "./config/logger.js";

let shuttingDown = false;

/**
 * Gracefully shut down the application.
 */
async function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  logger.info(
    { signal },
    "Shutting down Oracle MCP Server..."
  );

  try {
    // Future:
    // - close Oracle pool
    // - close transports
    // - flush logger

    process.exit(0);
  } catch (error) {
    logger.error(
      error,
      "Shutdown failed."
    );

    process.exit(1);
  }
}

/**
 * Start the application.
 */
async function main() {
  try {
    await createApplication();

    logger.info(
      "Oracle MCP Server started."
    );
  } catch (error) {
    logger.fatal(
      error,
      "Failed to start Oracle MCP Server."
    );

    process.exit(1);
  }
}

/*
|--------------------------------------------------------------------------
| Process Error Handling
|--------------------------------------------------------------------------
*/

process.on(
  "uncaughtException",
  (error) => {
    logger.fatal(
      error,
      "Uncaught exception."
    );

    process.exit(1);
  }
);

process.on(
  "unhandledRejection",
  (reason) => {
    logger.fatal(
      reason,
      "Unhandled promise rejection."
    );

    process.exit(1);
  }
);

/*
|--------------------------------------------------------------------------
| Graceful Shutdown
|--------------------------------------------------------------------------
*/

process.on(
  "SIGINT",
  () => shutdown("SIGINT")
);

process.on(
  "SIGTERM",
  () => shutdown("SIGTERM")
);

/*
|--------------------------------------------------------------------------
| Bootstrap
|--------------------------------------------------------------------------
*/

main();