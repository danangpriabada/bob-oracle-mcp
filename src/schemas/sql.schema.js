// src/schemas/sql.schema.js

import { z } from "zod";

export const executeSqlSchema = z.object({
  sql: z
    .string()
    .trim()
    .min(1, "SQL statement is required."),

  binds: z
    .record(z.any())
    .optional()
    .default({}),

  options: z
    .object({})
    .passthrough()
    .optional()
    .default({})
});

export const explainPlanSchema = z.object({
  sql: z
    .string()
    .trim()
    .min(1, "SQL statement is required.")
});

export const describeTableSchema = z.object({
  owner: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .default("PDBADMIN"),

  tableName: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .transform(value => value.toUpperCase())
});

export const listTablesSchema = z.object({
  owner: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .default("PDBADMIN")
});

export const listColumnsSchema = z.object({
  owner: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .default("PDBADMIN"),

  tableName: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .transform(value => value.toUpperCase())
});

export default {
  executeSql: executeSqlSchema,
  explainPlan: explainPlanSchema,
  describeTable: describeTableSchema,
  listTables: listTablesSchema,
  listColumns: listColumnsSchema,
};
