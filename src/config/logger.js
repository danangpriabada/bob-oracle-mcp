// src/config/logger.js

import pino from "pino";
import env from "./env.js";

const logger = pino(
  {
    level: env.nodeEnv === "production" ? "info" : "debug",

    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.destination({
    fd: 2, // stderr
    sync: false,
  })
);

export default logger;
