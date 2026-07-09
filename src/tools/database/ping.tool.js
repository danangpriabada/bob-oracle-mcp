// src/tools/database/ping.tool.js

import { z } from "zod";
import databaseService from "../../services/database.service.js";

export default {
  name: "database.ping",

  title: "Ping Database",

  description:
    "Checks connectivity to the Oracle database and returns connection health information.",

  inputSchema: z.object({}),

  /**
   * MCP Tool Handler
   */
  async handler() {
    const startedAt = Date.now();

    try {
      const result = await databaseService.ping();
      const latencyMs = Date.now() - startedAt;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                operation: "database.ping",
                latencyMs,
                timestamp: new Date().toISOString(),
                result,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: false,
                operation: "database.ping",
                timestamp: new Date().toISOString(),
                error: {
                  message: error.message,
                  name: error.name,
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }
  },
};