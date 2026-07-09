// src/tools/customer/delete.tool.js

import customerService from "../../services/customer/customer.service.js";

import {
  deleteCustomerSchema,
} from "../../schemas/customer.schema.js";

export default {
  name: "customer.delete",

  title: "Delete Customer",

  description: "Delete a customer from the Oracle database by ID.",

  inputSchema: deleteCustomerSchema,

  /**
   * MCP Tool Handler
   */
  async handler(input) {
    const result = await customerService.delete(input.id);

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
