// src/bootstrap/mcp.js

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerDatabaseTools } from "../registry/database.registry.js";
import { registerCustomerTools } from "../registry/customer.registry.js";

import logger from "../config/logger.js";

/**
 * Initialize the MCP server.
 *
 * @returns {Promise<McpServer>}
 */
export async function initializeMcp() {
  const server = new McpServer({
    name: "bob-oracle-mcp",
    version: "1.0.0",
  });

  logger.info("Registering database tools...");
  await registerDatabaseTools(server);

  logger.info("Registering customer tools...");
  await registerCustomerTools(server);

  logger.info("MCP Server initialized.");

  return server;
}