// src/utils/validator.js

import { ZodError } from "zod";

import ValidationError from "../exceptions/ValidationError.js";

/**
 * Validate input using a Zod schema.
 *
 * @template T
 * @param {import("zod").ZodSchema<T>} schema
 * @param {*} input
 * @returns {T}
 */
export function validate(
  schema,
  input
) {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        "Validation failed.",
        error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }))
      );
    }

    throw error;
  }
}

/**
 * Validate input without throwing.
 *
 * @template T
 * @param {import("zod").ZodSchema<T>} schema
 * @param {*} input
 * @returns {{
 *   success: true,
 *   data: T
 * } | {
 *   success: false,
 *   errors: Array<{
 *     path: string,
 *     message: string,
 *     code: string
 *   }>
 * }}
 */
export function validateSafe(
  schema,
  input
) {
  const result =
    schema.safeParse(input);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: result.error.issues.map(
      (issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })
    ),
  };
}

export default {
  validate,
  validateSafe,
};
