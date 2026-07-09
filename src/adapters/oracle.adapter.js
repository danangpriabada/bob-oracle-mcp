// src/adapters/oracle.adapter.js

import { once } from "node:events";

import oracledb from "oracledb";

import pool from "../db/pool.js";

import DatabaseError from "../exceptions/DatabaseError.js";

class OracleAdapter {
  /**
   * Execute a SQL statement using a pooled connection.
   *
   * @param {string} sql
   * @param {object} binds
   * @param {object} options
   * @returns {Promise<import("oracledb").Result>}
   */
  async execute(
    sql,
    binds = {},
    options = {}
  ) {
    return this.withConnection((connection) =>
      this.executeOn(
        connection,
        sql,
        binds,
        options
      )
    );
  }

  /**
   * Execute SQL using an existing connection.
   *
   * @param {import("oracledb").Connection} connection
   * @param {string} sql
   * @param {object} binds
   * @param {object} options
   * @returns {Promise<import("oracledb").Result>}
   */
  async executeOn(
    connection,
    sql,
    binds = {},
    options = {}
  ) {
    try {
      const result = await connection.execute(
        sql,
        binds,
        {
          outFormat:
            oracledb.OUT_FORMAT_OBJECT,

          autoCommit:
            options.autoCommit ?? false,

          ...options,
        }
      );

      await this.convertLobs(result.rows);

      return result;
    } catch (error) {
      throw new DatabaseError(
        error.message,
        error
      );
    }
  }

  /**
   * Execute many statements.
   *
   * @param {string} sql
   * @param {Array} binds
   * @param {object} options
   * @returns {Promise<import("oracledb").Result>}
   */
  async executeMany(
    sql,
    binds = [],
    options = {}
  ) {
    return this.withConnection(
      async (connection) => {
        try {
          return await connection.executeMany(
            sql,
            binds,
            {
              autoCommit:
                options.autoCommit ?? false,

              ...options,
            }
          );
        } catch (error) {
          throw new DatabaseError(
            error.message,
            error
          );
        }
      }
    );
  }

  /**
   * Execute multiple operations
   * using the same Oracle session.
   *
   * @template T
   * @param {(connection: import("oracledb").Connection) => Promise<T>} callback
   * @returns {Promise<T>}
   */
  async withConnection(callback) {
    const connection =
      await pool.getConnection();

    try {
      return await callback(connection);
    } catch (error) {
      throw new DatabaseError(
        error.message,
        error
      );
    } finally {
      await connection.close();
    }
  }

  /**
   * Execute operations inside
   * a transaction.
   *
   * @template T
   * @param {(connection: import("oracledb").Connection) => Promise<T>} callback
   * @returns {Promise<T>}
   */
  async transaction(callback) {
    return this.withConnection(
      async (connection) => {
        try {
          const result =
            await callback(connection);

          await connection.commit();

          return result;
        } catch (error) {
          await connection.rollback();

          throw new DatabaseError(
            error.message,
            error
          );
        }
      }
    );
  }

  /**
   * Convert Oracle LOB columns
   * into strings.
   *
   * @param {Array<object>} rows
   */
  async convertLobs(rows) {
    if (!Array.isArray(rows)) {
      return;
    }

    for (const row of rows) {
      for (const [key, value] of Object.entries(
        row
      )) {
        if (value instanceof oracledb.Lob) {
          row[key] =
            await this.lobToString(value);
        }
      }
    }
  }

  /**
   * Read an Oracle LOB as UTF-8.
   *
   * @param {import("oracledb").Lob|string|null} lob
   * @returns {Promise<string|null>}
   */
  async lobToString(lob) {
    if (!lob) {
      return null;
    }

    if (typeof lob === "string") {
      return lob;
    }

    let data = "";

    lob.setEncoding("utf8");

    lob.on("data", (chunk) => {
      data += chunk;
    });

    await once(lob, "end");

    return data;
  }

  /**
   * Get a pooled connection.
   *
   * @returns {Promise<import("oracledb").Connection>}
   */
  async getConnection() {
    return pool.getConnection();
  }

  /**
   * Commit an active transaction.
   *
   * @param {import("oracledb").Connection} connection
   */
  async commit(connection) {
    await connection.commit();
  }

  /**
   * Roll back an active transaction.
   *
   * @param {import("oracledb").Connection} connection
   */
  async rollback(connection) {
    await connection.rollback();
  }

  /**
   * Close a connection.
   *
   * @param {import("oracledb").Connection} connection
   */
  async close(connection) {
    if (connection) {
      await connection.close();
    }
  }

  /**
   * Check database connectivity.
   *
   * @returns {Promise<boolean>}
   */
  async ping() {
    return this.withConnection(
      async (connection) => {
        await connection.execute(
          "SELECT 1 FROM DUAL"
        );

        return true;
      }
    );
  }
}

export default new OracleAdapter();
