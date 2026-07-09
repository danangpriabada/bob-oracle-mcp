// src/schemas/customer.schema.js

import { z } from "zod";

/**
 * Common Customer ID schema.
 */
export const customerIdSchema = z.object({
  id: z.coerce
    .number({
      required_error: "Customer ID is required.",
      invalid_type_error: "Customer ID must be a number.",
    })
    .int("Customer ID must be an integer.")
    .positive("Customer ID must be greater than zero."),
});

/**
 * Customer creation schema.
 */
export const createCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must not exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Invalid email address.")
    .max(100, "Email must not exceed 100 characters."),

  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(100, "City must not exceed 100 characters."),
});

/**
 * Customer update schema.
 */
export const updateCustomerSchema =
  customerIdSchema.extend({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(100, "Name must not exceed 100 characters."),

    email: z
      .string()
      .trim()
      .email("Invalid email address.")
      .max(100, "Email must not exceed 100 characters."),

    city: z
      .string()
      .trim()
      .min(1, "City is required.")
      .max(100, "City must not exceed 100 characters."),
  });

export const getCustomerSchema =
  customerIdSchema;

export const deleteCustomerSchema =
  customerIdSchema;

export default {
  create: createCustomerSchema,
  update: updateCustomerSchema,
  get: getCustomerSchema,
  delete: deleteCustomerSchema,
};
