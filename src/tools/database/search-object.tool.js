// src/tools/database/search-object.tool.js

import { z } from "zod";

import schemaService from "../../services/metadata/schema.service.js";

export default {
  name: "database.search-object",

  title: "Search Database Objects",

  description:
    "Search Oracle database objects by name.",

  inputSchema: z.object({
    keyword: z
      .string()
      .min(1)
      .describe("Object name or partial name."),
  }),

  async handler({ keyword }) {
    const result =
      await schemaService.searchObjects(keyword);

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
