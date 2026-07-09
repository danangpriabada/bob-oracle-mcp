// src/tools/database/search-columns.tool.js

import { z } from "zod";

import tableService from "../../services/metadata/table.service.js";

export default {
  name: "database.search-columns",

  title: "Search Columns",

  description:
    "Search Oracle table and view columns by name.",

  inputSchema: z.object({
    keyword: z
      .string()
      .min(1)
      .describe("Column name or partial column name."),
  }),

  async handler({ keyword }) {
    const columns =
      await tableService.searchColumns(keyword);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(columns, null, 2),
        },
      ],
    };
  },
};
