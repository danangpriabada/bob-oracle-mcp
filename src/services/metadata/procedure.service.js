// src/services/metadata/procedure.service.js

import oracle from "../../adapters/oracle.adapter.js";

import PACKAGE_QUERIES from "../../queries/package.queries.js";

import ValidationError from "../../exceptions/ValidationError.js";

class ProcedureService {
  /**
   * List procedures within a package.
   */
  async list(owner, packageName) {
    const result = await oracle.execute(
      PACKAGE_QUERIES.LIST_PROCEDURES,
      {
        owner,
        packageName: packageName.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * Describe a procedure.
   */
  async describe(owner, packageName, procedureName) {
    const result = await oracle.execute(
      PACKAGE_QUERIES.LIST_ARGUMENTS,
      {
        owner,
        packageName: packageName.toUpperCase(),
        procedureName: procedureName.toUpperCase(),
      }
    );

    return result.rows;
  }

  /**
   * Determine whether a procedure exists.
   */
  async exists(owner, packageName, procedureName) {
    const procedures = await this.list(owner, packageName);

    return procedures.some(
      procedure =>
        procedure.PROCEDURE_NAME ===
        procedureName.toUpperCase()
    );
  }

  /**
   * Validate that a procedure exists.
   */
  async validate(owner, packageName, procedureName) {
    const exists = await this.exists(
      owner,
      packageName,
      procedureName
    );

    if (!exists) {
      throw new ValidationError(
        `Procedure '${packageName}.${procedureName}' does not exist.`
      );
    }
  }
}

export default new ProcedureService();
