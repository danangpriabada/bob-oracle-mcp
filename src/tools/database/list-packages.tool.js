// src/tools/database/list-packages.tool.js

import { z } from "zod";
import packageService from "../../services/metadata/package.service.js";

export default {
  name: "database.list-packages",

  title: "List Packages",

  description:
    "List all Oracle PL/SQL packages available in a schema.",

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
    const packages = await packageService.list(owner);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(packages, null, 2),
        },
      ],
    };
  },
};
