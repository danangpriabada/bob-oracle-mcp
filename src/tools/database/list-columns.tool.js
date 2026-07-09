// src/tools/database/list-columns.tool.js

import { z } from "zod";
import tableService from "../../services/metadata/table.service.js";

export default {
  name: "database.list-columns",

  title: "List Table Columns",

  description:
    "List all columns for a table in the Oracle database.",

  inputSchema: z.object({
    owner: z
      .string()
      .default("PDBADMIN")
      .describe("Oracle schema name."),

    tableName: z
      .string()
      .min(1)
      .describe("Oracle table name."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    owner = "PDBADMIN",
    tableName,
  }) {
    const columns = await tableService.describe(
      owner,
      tableName
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(columns, null, 2),
        },
      ],
    };
  },
};
