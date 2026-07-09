// src/tools/customer/list.tool.js

import { z } from "zod";
import customerService from "../../services/customer/customer.service.js";

export default {
  name: "customer.list",

  title: "List Customers",

  description: "Retrieve all customers from the Oracle database.",

  inputSchema: z.object({}),

  /**
   * MCP Tool Handler
   */
  async handler() {
    const customers = await customerService.list();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(customers, null, 2),
        },
      ],
    };
  },
};
