// src/app.js

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { initializeDatabase } from "./bootstrap/database.js";
import { initializeLogger } from "./bootstrap/logger.js";
import { initializeMcp } from "./bootstrap/mcp.js";

/**
 * Initialize the application.
 *
 * @returns {Promise<{
 *   server: import("@modelcontextprotocol/sdk/server/mcp.js").McpServer,
 *   transport: StdioServerTransport
 * }>}
 */
export async function createApplication() {
  // Initialize logger
  await initializeLogger();

  // Initialize Oracle connection pool
  await initializeDatabase();

  // Create MCP server
  const server = await initializeMcp();

  // Create STDIO transport
  const transport =
    new StdioServerTransport();

  // Connect transport
  await server.connect(transport);

  return {
    server,
    transport,
  };
}
