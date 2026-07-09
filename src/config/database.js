// src/config/database.js

import env from "./env.js";

const databaseConfig = {
  user: env.database.user,
  password: env.database.password,

  connectString: `${env.database.host}:${env.database.port}/${env.database.serviceName}`,

  poolMin: env.database.poolMin,
  poolMax: env.database.poolMax,
  poolIncrement: env.database.poolIncrement,

  poolTimeout: env.database.poolTimeout,
  queueTimeout: env.database.queueTimeout,

  stmtCacheSize: env.database.statementCacheSize,

  enableStatistics: false
};

export default databaseConfig;
