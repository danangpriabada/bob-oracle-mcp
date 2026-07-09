// src/tools/database/health.tool.js

import { z } from "zod";
import databaseService from "../../services/database.service.js";

export default {
  name: "database.health",

  title: "Database Health",

  description:
    "Check the health and connectivity of the Oracle database.",

  inputSchema: z.object({}),

  /**
   * MCP Tool Handler
   */
  async handler() {
    const health = await databaseService.health();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(health, null, 2),
        },
      ],
    };
  },
};
