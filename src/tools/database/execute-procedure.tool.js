// src/tools/database/execute-procedure.tool.js

import { z } from "zod";
import databaseService from "../../services/database.service.js";
import procedureService from "../../services/metadata/procedure.service.js";

export default {
  name: "database.execute-procedure",

  title: "Execute Procedure",

  description:
    "Execute an Oracle PL/SQL stored procedure.",

  inputSchema: z.object({
    owner: z
      .string()
      .default("PDBADMIN")
      .describe("Oracle schema name."),

    packageName: z
      .string()
      .min(1)
      .describe("Oracle package name."),

    procedureName: z
      .string()
      .min(1)
      .describe("Oracle procedure name."),

    parameters: z
      .record(z.string(), z.any())
      .default({})
      .describe("Procedure input parameters keyed by parameter name."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    owner = "PDBADMIN",
    packageName,
    procedureName,
    parameters = {},
  }) {
    await procedureService.validate(
      owner,
      packageName,
      procedureName
    );

    const result =
      await databaseService.executeProcedure({
        owner,
        packageName,
        procedureName,
        parameters,
      });

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
