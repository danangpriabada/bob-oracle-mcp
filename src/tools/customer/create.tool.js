// src/tools/customer/create.tool.js

import customerService from "../../services/customer/customer.service.js";

import {
  createCustomerSchema,
} from "../../schemas/customer.schema.js";

export default {
  name: "customer.create",

  title: "Create Customer",

  description: "Create a new customer in the Oracle database.",

  inputSchema: createCustomerSchema,

  /**
   * MCP Tool Handler
   */
  async handler(input) {
    const customer = await customerService.create(input);

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
