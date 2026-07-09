// src/services/metadata/package.service.js

import oracle from "../../adapters/oracle.adapter.js";

import PACKAGE_QUERIES from "../../queries/package.queries.js";

import ValidationError from "../../exceptions/ValidationError.js";

class PackageService {
  /**
   * List packages.
   */
  async list(owner = "PDBADMIN") {
    const result = await oracle.execute(
      PACKAGE_QUERIES.LIST_PACKAGES,
      { owner }
    );

    return result.rows;
  }

  /**
   * List procedures/functions in a package.
   */
  async procedures(owner, packageName) {
    if (!packageName) {
      throw new ValidationError(
        "Package name is required."
      );
    }

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
   * List package arguments.
   */
  async arguments(owner, packageName, procedureName) {
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
   * Determine whether a package exists.
   */
  async exists(owner, packageName) {
    const result = await oracle.execute(
      PACKAGE_QUERIES.PACKAGE_EXISTS,
      {
        owner,
        packageName: packageName.toUpperCase(),
      }
    );

    const row = result.rows?.[0];

    return (row?.TOTAL ?? 0) > 0;
  }

  /**
   * Validate that a package exists.
   */
  async validate(owner, packageName) {
    const exists = await this.exists(owner, packageName);

    if (!exists) {
      throw new ValidationError(
        `Package '${packageName}' does not exist.`
      );
    }
  }
}

export default new PackageService();
