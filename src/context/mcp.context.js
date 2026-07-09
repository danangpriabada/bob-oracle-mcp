// src/context/mcp.context.js

export default class McpContext {
  constructor({
    requestId = crypto.randomUUID(),
    connection = null,
    user = null,
    schema = null,
    readOnly = true,
    logger = null,
  } = {}) {
    this.requestId = requestId;
    this.connection = connection;
    this.user = user;
    this.schema = schema;
    this.readOnly = readOnly;
    this.logger = logger;
  }

  setConnection(connection) {
    this.connection = connection;
  }

  clearConnection() {
    this.connection = null;
  }

  setUser(user) {
    this.user = user;
  }

  setSchema(schema) {
    this.schema = schema;
  }

  setReadOnly(readOnly) {
    this.readOnly = readOnly;
  }
}
