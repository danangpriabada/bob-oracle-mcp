// src/tools/database/list-procedures.tool.js

import { z } from "zod";
import procedureService from "../../services/metadata/procedure.service.js";

export default {
  name: "database.list-procedures",

  title: "List Package Procedures",

  description:
    "List all procedures and functions contained in an Oracle PL/SQL package.",

  inputSchema: z.object({
    owner: z
      .string()
      .default("PDBADMIN")
      .describe("Oracle schema name."),

    packageName: z
      .string()
      .min(1)
      .describe("Oracle package name."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    owner = "PDBADMIN",
    packageName,
  }) {
    const procedures = await procedureService.list(
      owner,
      packageName
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(procedures, null, 2),
        },
      ],
    };
  },
};
