// src/services/transaction.service.js

import transaction from "../db/transaction.js";
import logger from "../config/logger.js";

class TransactionService {
  /**
   * Execute a callback within a database transaction.
   *
   * @param {(connection: import("oracledb").Connection) => Promise<any>} callback
   * @returns {Promise<any>}
   */
  async run(callback) {
    const connection = await transaction.begin();

    try {
      const result = await callback(connection);

      await transaction.commit(connection);

      return result;
    } catch (error) {
      await transaction.rollback(connection);

      logger.error(error, "Transaction rolled back.");

      throw error;
    }
  }
}

export default new TransactionService();
