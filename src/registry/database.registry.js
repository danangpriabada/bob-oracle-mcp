// src/registry/database.registry.js

import currentSchemaTool from "../tools/database/current-schema.tool.js";
import currentUserTool from "../tools/database/current-user.tool.js";
import databaseVersionTool from "../tools/database/database-version.tool.js";
import describeTableTool from "../tools/database/describe-table.tool.js";
import executeFunctionTool from "../tools/database/execute-function.tool.js";
import executeProcedureTool from "../tools/database/execute-procedure.tool.js";
import executeSqlTool from "../tools/database/execute-sql.tool.js";
import explainPlanTool from "../tools/database/explain-plan.tool.js";
import healthTool from "../tools/database/health.tool.js";
import listColumnsTool from "../tools/database/list-columns.tool.js";
import listConstraintsTool from "../tools/database/list-constraints.tool.js";
import listIndexesTool from "../tools/database/list-indexes.tool.js";
import listPackagesTool from "../tools/database/list-packages.tool.js";
import listProceduresTool from "../tools/database/list-procedures.tool.js";
import listSequencesTool from "../tools/database/list-sequences.tool.js";
import listTablesTool from "../tools/database/list-tables.tool.js";
import listViewsTool from "../tools/database/list-views.tool.js";
import pingTool from "../tools/database/ping.tool.js";
import searchObjectTool from "../tools/database/search-object.tool.js";
import searchColumnsTool from "../tools/database/search-columns.tool.js";
import getDdlTool from "../tools/database/get-ddl.tool.js";

/**
 * Register all database-related MCP tools.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export async function registerDatabaseTools(server) {
  const tools = [
    currentSchemaTool,
    currentUserTool,
    databaseVersionTool,
    describeTableTool,
    executeFunctionTool,
    executeProcedureTool,
    executeSqlTool,
    explainPlanTool,
    healthTool,
    listColumnsTool,
    listConstraintsTool,
    listIndexesTool,
    listPackagesTool,
    listProceduresTool,
    listSequencesTool,
    listTablesTool,
    listViewsTool,
    pingTool,
    searchObjectTool,
    searchColumnsTool,
    getDdlTool,
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

export default registerDatabaseTools;
