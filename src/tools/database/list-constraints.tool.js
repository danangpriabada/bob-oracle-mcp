// src/tools/database/list-constraints.tool.js

import { z } from "zod";
import tableService from "../../services/metadata/table.service.js";

export default {
  name: "database.list-constraints",

  title: "List Table Constraints",

  description:
    "List all constraints defined on an Oracle table.",

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
    const constraints = await tableService.constraints(
      owner,
      tableName
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(constraints, null, 2),
        },
      ],
    };
  },
};
