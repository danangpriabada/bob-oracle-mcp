// src/services/customer/customer.service.js

import customerRepository from "../../repositories/customer.repository.js";

import customerSchema from "../../schemas/customer.schema.js";

import validator from "../../utils/validator.js";

import ValidationError from "../../exceptions/ValidationError.js";

class CustomerService {
  /**
   * Get all customers.
   */
  async list() {
    return customerRepository.findAll();
  }

  /**
   * Get customer by ID.
   */
  async get(id) {
    const { id: customerId } = validator.validate(
      customerSchema.get,
      { id }
    );

    const customer = await customerRepository.findById(customerId);

    if (!customer) {
      throw new ValidationError(
        `Customer ${customerId} does not exist.`
      );
    }

    return customer;
  }

  /**
   * Create customer.
   */
  async create(input) {
    const customer = validator.validate(
      customerSchema.create,
      input
    );

    const existing = await customerRepository.findByEmail(
      customer.email
    );

    if (existing) {
      throw new ValidationError(
        "Email already exists."
      );
    }

    const id = await customerRepository.create(customer);

    return customerRepository.findById(id);
  }

  /**
   * Update customer.
   */
  async update(id, input) {
    const customer = validator.validate(
      customerSchema.update,
      {
        id,
        ...input,
      }
    );

    const existing = await customerRepository.findById(customer.id);

    if (!existing) {
      throw new ValidationError(
        `Customer ${customer.id} does not exist.`
      );
    }

    await customerRepository.update(customer.id, customer);

    return customerRepository.findById(customer.id);
  }

  /**
   * Delete customer.
   */
  async delete(id) {
    const { id: customerId } = validator.validate(
      customerSchema.delete,
      { id }
    );

    const existing = await customerRepository.findById(customerId);

    if (!existing) {
      throw new ValidationError(
        `Customer ${customerId} does not exist.`
      );
    }

    await customerRepository.delete(customerId);

    return {
      id: customerId,
      deleted: true,
    };
  }
}

export default new CustomerService();
