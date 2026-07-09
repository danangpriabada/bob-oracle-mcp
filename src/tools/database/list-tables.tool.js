// src/tools/database/list-tables.tool.js

import { z } from "zod";
import tableService from "../../services/metadata/table.service.js";

export default {
  name: "database.list-tables",

  title: "List Tables",

  description:
    "List all tables available in an Oracle schema.",

  inputSchema: z.object({
    owner: z
      .string()
      .default("PDBADMIN")
      .describe("Oracle schema name."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    owner = "PDBADMIN",
  }) {
    const tables = await tableService.list(owner);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(tables, null, 2),
        },
      ],
    };
  },
};
