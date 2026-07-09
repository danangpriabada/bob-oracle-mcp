// src/tools/database/current-schema.tool.js

import { z } from "zod";
import schemaService from "../../services/metadata/schema.service.js";

export default {
  name: "database.current-schema",

  title: "Current Schema",

  description:
    "Returns the current Oracle schema for the active database connection.",

  inputSchema: z.object({}),

  /**
   * MCP Tool Handler
   */
  async handler() {
    const schema = await schemaService.current();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(schema, null, 2),
        },
      ],
    };
  },
};
