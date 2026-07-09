// src/tools/database/database-version.tool.js

import { z } from "zod";
import schemaService from "../../services/metadata/schema.service.js";

export default {
  name: "database.database-version",

  title: "Database Version",

  description:
    "Returns Oracle database version information.",

  inputSchema: z.object({}),

  /**
   * MCP Tool Handler
   */
  async handler() {
    const version = await schemaService.version();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(version, null, 2),
        },
      ],
    };
  },
};
