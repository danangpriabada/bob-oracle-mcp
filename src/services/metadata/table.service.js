// src/services/metadata/table.service.js

import oracle from "../../adapters/oracle.adapter.js";

import METADATA_QUERIES from "../../queries/metadata.queries.js";

import ValidationError from "../../exceptions/ValidationError.js";

class TableService {

  /**
   * Search columns by name.
   */
  async searchColumns(keyword) {
    const result = await oracle.execute(
      METADATA_QUERIES.SEARCH_COLUMNS,
      {
        keyword,
      }
    );

    return result.rows;
  }

  /**
   * List all tables in a schema.
   *
   * @param {string} owner
   */
  async list(owner = "PDBADMIN") {
    const result = await oracle.execute(
      METADATA_QUERIES.LIST_TABLES,
      {
        owner: owner.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * Describe table columns.
   *
   * @param {string} owner
   * @param {string} tableName
   */
  async describe(owner = "PDBADMIN", tableName) {
    if (!tableName) {
      throw new ValidationError(
        "Table name is required."
      );
    }

    const result = await oracle.execute(
      METADATA_QUERIES.LIST_COLUMNS,
      {
        owner: owner.toUpperCase(),
        tableName: tableName.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * List table indexes.
   *
   * @param {string} owner
   * @param {string} tableName
   */
  async indexes(owner = "PDBADMIN", tableName) {
    const result = await oracle.execute(
      METADATA_QUERIES.LIST_INDEXES,
      {
        owner: owner.toUpperCase(),
        tableName: tableName.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * List table constraints.
   *
   * @param {string} owner
   * @param {string} tableName
   */
  async constraints(owner = "PDBADMIN", tableName) {
    const result = await oracle.execute(
      METADATA_QUERIES.LIST_CONSTRAINTS,
      {
        owner: owner.toUpperCase(),
        tableName: tableName.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * Determine whether a table exists.
   *
   * @param {string} owner
   * @param {string} tableName
   */
  async exists(owner = "PDBADMIN", tableName) {
    const tables = await this.list(owner);

    return tables.some(
      table =>
        table.TABLE_NAME === tableName.toUpperCase()
    );
  }

  /**
   * Validate that a table exists.
   *
   * @param {string} owner
   * @param {string} tableName
   */
  async validate(owner = "PDBADMIN", tableName) {
    const exists = await this.exists(owner, tableName);

    if (!exists) {
      throw new ValidationError(
        `Table '${owner}.${tableName}' does not exist.`
      );
    }
  }
}

export default new TableService();
