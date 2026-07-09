// src/queries/customer.queries.js

export const CUSTOMER_QUERIES = {
  FIND_ALL: `
    SELECT
      ID,
      NAME,
      EMAIL,
      CITY,
      CREATED_AT
    FROM PDBADMIN.CUSTOMERS
    ORDER BY ID
  `,

  FIND_BY_ID: `
    SELECT
      ID,
      NAME,
      EMAIL,
      CITY,
      CREATED_AT
    FROM PDBADMIN.CUSTOMERS
    WHERE ID = :id
  `,

  FIND_BY_EMAIL: `
    SELECT
      ID,
      NAME,
      EMAIL,
      CITY,
      CREATED_AT
    FROM PDBADMIN.CUSTOMERS
    WHERE EMAIL = :email
  `,

  INSERT: `
    INSERT INTO PDBADMIN.CUSTOMERS (
      NAME,
      EMAIL,
      CITY
    )
    VALUES (
      :name,
      :email,
      :city
    )
    RETURNING ID INTO :id
  `,

  UPDATE: `
    UPDATE PDBADMIN.CUSTOMERS
       SET NAME  = :name,
           EMAIL = :email,
           CITY  = :city
     WHERE ID = :id
  `,

  DELETE: `
    DELETE
      FROM PDBADMIN.CUSTOMERS
     WHERE ID = :id
  `,

  COUNT: `
    SELECT COUNT(*) AS TOTAL
    FROM PDBADMIN.CUSTOMERS
  `
};

export default CUSTOMER_QUERIES;
