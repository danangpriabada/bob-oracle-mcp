// src/services/metadata/schema.service.js

import oracle from "../../adapters/oracle.adapter.js";

import oracledb from "oracledb";

import METADATA_QUERIES from "../../queries/metadata.queries.js";

import ValidationError from "../../exceptions/ValidationError.js";

class SchemaService {

  /**
   * Get the DDL of an Oracle object.
   */
  async getDDL(owner, objectType, objectName) {
    return oracle.withConnection(async (connection) => {

      await oracle.executeOn(
        connection,
        `
        BEGIN
          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'PRETTY',
            TRUE
          );

          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'SQLTERMINATOR',
            TRUE
          );

          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'STORAGE',
            FALSE
          );

          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'SEGMENT_ATTRIBUTES',
            FALSE
          );

          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'TABLESPACE',
            FALSE
          );

          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'CONSTRAINTS_AS_ALTER',
            FALSE
          );

          DBMS_METADATA.SET_TRANSFORM_PARAM(
            DBMS_METADATA.SESSION_TRANSFORM,
            'REF_CONSTRAINTS',
            TRUE
          );
        END;
        `
      );

      const result = await oracle.executeOn(
        connection,
        METADATA_QUERIES.GET_DDL,
        {
          owner: owner.toUpperCase(),
          objectType: objectType.toUpperCase(),
          objectName: objectName.toUpperCase(),
        },
        {
          fetchInfo: {
            DDL: {
              type: oracledb.STRING,
            },
          },
        }
      );

      const ddl = result.rows?.[0]?.DDL;

      if (!ddl) {
        return null;
      }

      return ddl
        .replace(/\r\n/g, "\n")
        .replace(/[ \t]+$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    });
  }

  /**
   * Search Oracle objects.
   */
  async searchObjects(keyword) {
    const result = await oracle.execute(
      METADATA_QUERIES.SEARCH_OBJECTS,
      {
        keyword,
      }
    );

    return result.rows;
  }

  /**
   * Get the current schema.
   */
  async current() {
    const result = await oracle.execute(
      METADATA_QUERIES.CURRENT_SCHEMA
    );

    return result.rows?.[0] ?? null;
  }

  /**
   * Get the current Oracle user.
   */
  async currentUser() {
    const result = await oracle.execute(
      METADATA_QUERIES.CURRENT_USER
    );

    return result.rows?.[0] ?? null;
  }

  /**
   * Get Oracle database version.
   */
  async version() {
    const result = await oracle.execute(
      METADATA_QUERIES.DATABASE_VERSION
    );

    return result.rows?.[0] ?? null;
  }

  /**
   * List all tables in a schema.
   */
  async tables(owner = "PDBADMIN") {
    const result = await oracle.execute(
      METADATA_QUERIES.LIST_TABLES,
      {
        owner: owner.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * List all views in a schema.
   */
  async views(owner = "PDBADMIN") {
    const result = await oracle.execute(
      METADATA_QUERIES.LIST_VIEWS,
      {
        owner: owner.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * List all sequences in a schema.
   */
  async sequences(owner = "PDBADMIN") {
    const result = await oracle.execute(
      METADATA_QUERIES.LIST_SEQUENCES,
      {
        owner: owner.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * Validate that a schema exists.
   */
  async exists(owner = "PDBADMIN") {
    const tables = await this.tables(owner);

    return tables.length > 0;
  }

  /**
   * Ensure the schema exists.
   */
  async validate(owner = "PDBADMIN") {
    const exists = await this.exists(owner);

    if (!exists) {
      throw new ValidationError(
        `Schema '${owner}' does not exist or is inaccessible.`
      );
    }
  }
}

export default new SchemaService();
