// src/tools/database/get-ddl.tool.js

import { z } from "zod";

import schemaService from "../../services/metadata/schema.service.js";

const OBJECT_TYPES = [
  "TABLE",
  "VIEW",
  "PACKAGE",
  "PACKAGE_BODY",
  "PROCEDURE",
  "FUNCTION",
  "SEQUENCE",
  "SYNONYM",
  "TYPE",
  "TRIGGER",
];

export default {
  name: "database.get-ddl",

  title: "Get Object DDL",

  description:
    "Returns the Oracle DDL for a database object.",

  inputSchema: z.object({
    owner: z
      .string()
      .default("PDBADMIN")
      .describe("Oracle schema name."),

    objectType: z
      .enum(OBJECT_TYPES)
      .describe("Oracle object type."),

    objectName: z
      .string()
      .trim()
      .min(1)
      .describe("Oracle object name."),
  }),

  /**
   * MCP Tool Handler
   */
  async handler({
    owner = "PDBADMIN",
    objectType,
    objectName,
  }) {
    const ddl = await schemaService.getDDL(
      owner,
      objectType,
      objectName
    );

    if (!ddl) {
      return {
        content: [
          {
            type: "text",
            text: `No DDL found for ${objectType} '${owner}.${objectName}'.`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: [
            "```sql",
            ddl.trim(),
            "```",
          ].join("\n"),
        },
      ],
    };
  },
};