// src/repositories/customer.repository.js

import oracledb from "oracledb";

import BaseRepository from "./base.repository.js";
import CUSTOMER_QUERIES from "../queries/customer.queries.js";

class CustomerRepository extends BaseRepository {
  /**
   * Get all customers.
   */
  async findAll() {
    return this.findMany(CUSTOMER_QUERIES.FIND_ALL);
  }

  /**
   * Get customer by ID.
   */
  async findById(id) {
    return this.findOne(
      CUSTOMER_QUERIES.FIND_BY_ID,
      { id }
    );
  }

  /**
   * Get customer by email.
   */
  async findByEmail(email) {
    return this.findOne(
      CUSTOMER_QUERIES.FIND_BY_EMAIL,
      { email }
    );
  }

  /**
   * Create a customer.
   */
  async create(customer) {
    return this.insert(
      CUSTOMER_QUERIES.INSERT,
      {
        name: customer.name,
        email: customer.email,
        city: customer.city,

        id: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER,
        },
      },
      "id"
    );
  }

  /**
   * Update a customer.
   */
  async update(id, customer) {
    return this.executeUpdate(
      CUSTOMER_QUERIES.UPDATE,
      {
        id,
        name: customer.name,
        email: customer.email,
        city: customer.city,
      }
    );
  }

  /**
   * Delete a customer.
   */
  async delete(id) {
    return this.executeUpdate(
      CUSTOMER_QUERIES.DELETE,
      { id }
    );
  }

  /**
   * Count customers.
   */
  async count() {
    return super.count(
      CUSTOMER_QUERIES.COUNT
    );
  }
}

export default new CustomerRepository();
