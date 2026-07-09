// src/config/env.js

import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function number(name, defaultValue) {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }

  return parsed;
}

function boolean(name, defaultValue = false) {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: number("PORT", 3000),

  database: {
    host: required("DB_HOST"),
    port: number("DB_PORT", 1521),
    serviceName: required("DB_SERVICE_NAME"),

    user: required("DB_USER"),
    password: required("DB_PASSWORD"),

    poolMin: number("DB_POOL_MIN", 2),
    poolMax: number("DB_POOL_MAX", 10),
    poolIncrement: number("DB_POOL_INCREMENT", 1),
    poolTimeout: number("DB_POOL_TIMEOUT", 60),

    queueTimeout: number("DB_QUEUE_TIMEOUT", 60000),
    statementCacheSize: number("DB_STATEMENT_CACHE_SIZE", 30),
  },

  readOnly: boolean("READ_ONLY", true),
};

export default env;
