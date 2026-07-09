# Oracle MCP

![Node](https://img.shields.io/badge/node-20+-green)
![Oracle](https://img.shields.io/badge/database-Oracle-red)
![MCP](https://img.shields.io/badge/MCP-Compatible-blue)
![License](https://img.shields.io/github/license/danangpriabada/bob-oracle-mcp)

Production-ready Oracle Model Context Protocol (MCP) Server for Oracle Database.

Oracle MCP provides AI assistants with secure, structured access to Oracle databases through the Model Context Protocol. It is designed with a modular architecture, read-only safety by default, metadata discovery, and extensible tool registration.

## Features

* Oracle Database connectivity
* Connection pooling
* Read-only mode by default
* SQL validation
* Metadata discovery
* Stored procedure execution
* Function execution
* Transaction support
* Modular service architecture
* MCP-compliant tool registry
* Logging and audit middleware
* Environment-based configuration

---

## Project Structure

```text
.
├── docs/
├── logs/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── fixtures/
│   └── mocks/
├── src/
│   ├── adapters/
│   ├── bootstrap/
│   ├── config/
│   ├── constants/
│   ├── context/
│   ├── db/
│   ├── exceptions/
│   ├── middleware/
│   ├── queries/
│   ├── registry/
│   ├── repositories/
│   ├── schemas/
│   ├── security/
│   ├── services/
│   ├── tools/
│   ├── utils/
│   └── validators/
├── .env.example
├── package.json
└── README.md
```

---

## Requirements

* Node.js 20+
* Oracle Database 19c or newer
* Oracle Instant Client (if required by your platform)

---

## Installation

Clone the repository.

```bash
git clone https://github.com/danangpriabada/bob-oracle-mcp.git
cd bob-oracle-mcp
```

Install dependencies.

```bash
npm install
```

Create your environment configuration.

```bash
cp .env.example .env
```

---

## Environment Variables

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=1521
DB_SERVICE_NAME=FREEPDB1

DB_USER=
DB_PASSWORD=

DB_POOL_MIN=2
DB_POOL_MAX=10
DB_POOL_INCREMENT=1

READ_ONLY=true
```

---

## Running

Start the server.

```bash
node src/server.js
```

Or with npm.

```bash
npm start
```

---

## MCP Inspector

Install the inspector.

```bash
npm install -g @modelcontextprotocol/inspector
```

Launch the server.

```bash
npx @modelcontextprotocol/inspector node src/server.js
```

If you need to remove it:

```bash
npm uninstall -g @modelcontextprotocol/inspector
```

---

## Planned MCP Tools

### Database

* ping
* health
* current-user
* current-schema
* database-version
* execute-sql
* explain-plan
* describe-table
* list-tables
* list-views
* list-columns
* list-indexes
* list-constraints
* list-sequences
* list-packages
* list-procedures
* execute-function
* execute-procedure

### Customer

* create
* update
* delete
* get
* list

---

## Security

Oracle MCP is designed with production safety in mind.

* Read-only mode enabled by default
* SQL validation
* Permission checks
* Audit logging
* Configurable tool registration
* Centralized error handling

---

## License

MIT

---

## Author

Danang Priabada
GitHub: https://github.com/danangpriabada
