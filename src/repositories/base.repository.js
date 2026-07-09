// src/repositories/base.repository.js

import oracle from "../adapters/oracle.adapter.js";

export default class BaseRepository {
  /**
   * Execute a SQL statement.
   *
   * Default:
   * - autoCommit = false
   */
  async execute(
    sql,
    binds = {},
    options = {}
  ) {
    return oracle.execute(
      sql,
      binds,
      options
    );
  }

  /**
   * Execute multiple SQL statements.
   */
  async executeMany(
    sql,
    binds = [],
    options = {}
  ) {
    return oracle.executeMany(
      sql,
      binds,
      options
    );
  }

  /**
   * Execute an INSERT ... RETURNING statement.
   *
   * @param {string} sql
   * @param {Object} binds
   * @param {string} returning
   * @param {Object} options
   * @returns {Promise<*>}
   */
  async insert(
    sql,
    binds = {},
    returning,
    options = {}
  ) {
    const result = await oracle.execute(
      sql,
      binds,
      {
        autoCommit: true,
        ...options,
      }
    );

    const value =
      result.outBinds?.[returning];

    if (value == null) {
      return null;
    }

    return Array.isArray(value)
      ? value[0]
      : value;
  }

  /**
   * Execute an UPDATE or DELETE statement.
   *
   * @returns {Promise<number>}
   */
  async executeUpdate(
    sql,
    binds = {},
    options = {}
  ) {
    const result = await oracle.execute(
      sql,
      binds,
      {
        autoCommit: true,
        ...options,
      }
    );

    return result.rowsAffected ?? 0;
  }

  /**
   * Execute a query and return the first row.
   */
  async findOne(
    sql,
    binds = {},
    options = {}
  ) {
    const result = await this.execute(
      sql,
      binds,
      options
    );

    return result.rows?.[0] ?? null;
  }

  /**
   * Execute a query and return all rows.
   */
  async findMany(
    sql,
    binds = {},
    options = {}
  ) {
    const result = await this.execute(
      sql,
      binds,
      options
    );

    return result.rows ?? [];
  }

  /**
   * Check whether a query returns at least one row.
   */
  async exists(
    sql,
    binds = {},
    options = {}
  ) {
    return (
      await this.findOne(
        sql,
        binds,
        options
      )
    ) !== null;
  }

  /**
   * Execute a COUNT query.
   */
  async count(
    sql,
    binds = {},
    options = {}
  ) {
    const row = await this.findOne(
      sql,
      binds,
      options
    );

    if (!row) {
      return 0;
    }

    return Number(
      Object.values(row)[0]
    );
  }
}