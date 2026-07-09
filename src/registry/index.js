// src/registry/index.js

import registerDatabaseTools from "./database.registry.js";
import registerCustomerTools from "./customer.registry.js";

/**
 * Register all MCP tools.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export async function registerAllTools(server) {
  await registerDatabaseTools(server);
  await registerCustomerTools(server);
}

export {
  registerDatabaseTools,
  registerCustomerTools,
};

export default registerAllTools;
