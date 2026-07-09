// src/tools/database/explain-plan.tool.js

import { z } from "zod";
import databaseService from "../../services/database.service.js";

export default {
  name: "database.explain-plan",

  title: "Explain Execution Plan",

  description:
    "Generates the execution plan for a SQL statement without executing it.",

  inputSchema: z.object({
    sql: z
      .string()
      .trim()
      .min(1)
      .describe("The SQL statement to analyze."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({ sql }) {
    const startedAt = Date.now();

    try {
      const plan = await databaseService.explain(sql);
      const duration = Date.now() - startedAt;

      return {
        content: [
          {
            type: "text",
            text: [
              "Execution Plan",
              "==============",
              "",
              "Status      : Success",
              `Duration    : ${duration} ms`,
              "",
              "SQL",
              "---",
              sql,
            ].join("\n"),
          },
          {
            type: "text",
            text:
              typeof plan === "string"
                ? plan
                : JSON.stringify(plan, null, 2),
          },
        ],
      };
    } catch (error) {
      const duration = Date.now() - startedAt;

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: [
              "Execution Plan",
              "==============",
              "",
              "Status      : Failed",
              `Duration    : ${duration} ms`,
              "",
              "SQL",
              "---",
              sql,
              "",
              "Message",
              "-------",
              error.message,
            ].join("\n"),
          },
        ],
      };
    }
  },
};