// src/tools/database/execute-function.tool.js

import { z } from "zod";
import databaseService from "../../services/database.service.js";
import procedureService from "../../services/metadata/procedure.service.js";

export default {
  name: "database.execute-function",

  title: "Execute Function",

  description:
    "Execute an Oracle PL/SQL function and return its result.",

  inputSchema: z.object({
    owner: z
      .string()
      .default("PDBADMIN")
      .describe("Oracle schema name."),

    packageName: z
      .string()
      .min(1)
      .describe("Oracle package name."),

    functionName: z
      .string()
      .min(1)
      .describe("Oracle function name."),

    parameters: z
      .array(z.any())
      .default([])
      .describe("Function parameters in declaration order."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    owner = "PDBADMIN",
    packageName,
    functionName,
    parameters = [],
  }) {
    await procedureService.validate(
      owner,
      packageName,
      functionName
    );

    const result = await databaseService.executeFunction({
      owner,
      packageName,
      functionName,
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
