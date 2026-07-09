// src/registry/customer.registry.js

import createCustomerTool from "../tools/customer/create.tool.js";
import updateCustomerTool from "../tools/customer/update.tool.js";
import deleteCustomerTool from "../tools/customer/delete.tool.js";
import getCustomerTool from "../tools/customer/get.tool.js";
import listCustomersTool from "../tools/customer/list.tool.js";

/**
 * Register all customer-related MCP tools.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export async function registerCustomerTools(server) {
  const tools = [
    createCustomerTool,
    updateCustomerTool,
    deleteCustomerTool,
    getCustomerTool,
    listCustomersTool,
  ];

  for (const tool of tools) {
    server.registerTool(
      tool.name,
      {
        title: tool.title,
        description: tool.description,
        inputSchema: tool.inputSchema,
      },
      tool.handler
    );
  }
}

export default registerCustomerTools;
