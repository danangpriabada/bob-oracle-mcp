// src/tools/customer/update.tool.js

import customerService from "../../services/customer/customer.service.js";

import {
  updateCustomerSchema,
} from "../../schemas/customer.schema.js";

export default {
  name: "customer.update",

  title: "Update Customer",

  description: "Update an existing customer in the Oracle database.",

  inputSchema: updateCustomerSchema,

  /**
   * MCP Tool Handler
   */
  async handler(input) {
    const customer = await customerService.update(
      input.id,
      {
        name: input.name,
        email: input.email,
        city: input.city,
      }
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(customer, null, 2),
        },
      ],
    };
  },
};
