// src/queries/package.queries.js

export const PACKAGE_QUERIES = {
  LIST_PACKAGES: `
    SELECT
      OWNER,
      OBJECT_NAME AS PACKAGE_NAME,
      STATUS,
      CREATED,
      LAST_DDL_TIME
    FROM ALL_OBJECTS
    WHERE OWNER = :owner
      AND OBJECT_TYPE = 'PACKAGE'
    ORDER BY OBJECT_NAME
  `,

  LIST_PROCEDURES: `
    SELECT
      OWNER,
      OBJECT_NAME AS PACKAGE_NAME,
      PROCEDURE_NAME,
      SUBPROGRAM_ID,
      OVERLOAD
    FROM ALL_PROCEDURES
    WHERE OWNER = :owner
      AND OBJECT_NAME = :packageName
    ORDER BY SUBPROGRAM_ID
  `,

  LIST_ARGUMENTS: `
    SELECT
      POSITION,
      ARGUMENT_NAME,
      DATA_TYPE,
      IN_OUT,
      DEFAULTED
    FROM ALL_ARGUMENTS
    WHERE OWNER = :owner
      AND PACKAGE_NAME = :packageName
      AND OBJECT_NAME = :procedureName
    ORDER BY POSITION
  `,

  PACKAGE_SOURCE: `
    SELECT
      LINE,
      TEXT
    FROM ALL_SOURCE
    WHERE OWNER = :owner
      AND NAME = :packageName
      AND TYPE = 'PACKAGE'
    ORDER BY LINE
  `,

  PACKAGE_BODY_SOURCE: `
    SELECT
      LINE,
      TEXT
    FROM ALL_SOURCE
    WHERE OWNER = :owner
      AND NAME = :packageName
      AND TYPE = 'PACKAGE BODY'
    ORDER BY LINE
  `,

  PACKAGE_EXISTS: `
    SELECT COUNT(*) AS TOTAL
    FROM ALL_OBJECTS
    WHERE OWNER = :owner
      AND OBJECT_NAME = :packageName
      AND OBJECT_TYPE = 'PACKAGE'
  `
};

export default PACKAGE_QUERIES;
