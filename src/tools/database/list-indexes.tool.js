// src/tools/database/list-indexes.tool.js

import { z } from "zod";
import tableService from "../../services/metadata/table.service.js";

export default {
  name: "database.list-indexes",

  title: "List Table Indexes",

  description:
    "List all indexes defined on an Oracle table.",

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
    const indexes = await tableService.indexes(
      owner,
      tableName
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(indexes, null, 2),
        },
      ],
    };
  },
};
