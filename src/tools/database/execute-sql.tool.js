// src/tools/database/execute-sql.tool.js

import { z } from "zod";
import databaseService from "../../services/database.service.js";

export default {
  name: "database.execute-sql",

  title: "Execute SQL",

  description:
    "Execute a SQL statement against the Oracle database.",

  inputSchema: z.object({
    sql: z
      .string()
      .min(1)
      .describe("SQL statement to execute."),

    binds: z
      .record(z.string(), z.any())
      .default({})
      .describe("Bind variables keyed by bind name."),

    options: z
      .record(z.string(), z.any())
      .default({})
      .describe("Oracle execution options."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    sql,
    binds = {},
    options = {},
  }) {
    const result = await databaseService.execute(
      sql,
      binds,
      options
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
};
