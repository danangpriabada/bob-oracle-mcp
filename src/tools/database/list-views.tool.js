// src/tools/database/list-views.tool.js

import { z } from "zod";
import schemaService from "../../services/metadata/schema.service.js";

export default {
  name: "database.list-views",

  title: "List Views",

  description:
    "List all Oracle views available in a schema.",

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
    const views = await schemaService.views(owner);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(views, null, 2),
        },
      ],
    };
  },
};
