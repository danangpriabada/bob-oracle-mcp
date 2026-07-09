// src/tools/customer/get.tool.js

import customerService from "../../services/customer/customer.service.js";

import {
  getCustomerSchema,
} from "../../schemas/customer.schema.js";

export default {
  name: "customer.get",

  title: "Get Customer",

  description: "Retrieve a customer by ID from the Oracle database.",

  inputSchema: getCustomerSchema,

  /**
   * MCP Tool Handler
   */
  async handler(input) {
    const customer = await customerService.get(input.id);

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
