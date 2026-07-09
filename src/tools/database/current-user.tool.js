// src/tools/database/current-user.tool.js

import { z } from "zod";
import schemaService from "../../services/metadata/schema.service.js";

export default {
  name: "database.current-user",

  title: "Current User",

  description:
    "Returns the current Oracle database user for the active connection.",

  inputSchema: z.object({}),

  /**
   * MCP Tool Handler
   */
  async handler() {
    const user = await schemaService.currentUser();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(user, null, 2),
        },
      ],
    };
  },
};
