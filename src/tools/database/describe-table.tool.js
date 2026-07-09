// src/tools/database/describe-table.tool.js

import { z } from "zod";
import tableService from "../../services/metadata/table.service.js";

export default {
  name: "database.describe-table",

  title: "Describe Table",

  description:
    "Returns the column definition of an Oracle table.",

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
