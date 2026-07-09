// src/tools/database/list-sequences.tool.js

import { z } from "zod";
import schemaService from "../../services/metadata/schema.service.js";

export default {
  name: "database.list-sequences",

  title: "List Sequences",

  description:
    "List all Oracle sequences available in a schema.",

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
    const sequences = await schemaService.sequences(owner);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(sequences, null, 2),
        },
      ],
    };
  },
};
