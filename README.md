# Oracle MCP

![Node](https://img.shields.io/badge/node-20+-green)
![Oracle](https://img.shields.io/badge/database-Oracle-red)
![MCP](https://img.shields.io/badge/MCP-Compatible-blue)
![License](https://img.shields.io/github/license/danangpriabada/bob-oracle-mcp)

Production-ready Oracle Model Context Protocol (MCP) Server built with Node.js.

Oracle MCP provides AI assistants with secure, structured access to Oracle Database through the Model Context Protocol (MCP). The project follows a layered architecture with adapters, repositories, services, registries, and MCP tools, making it easy to extend while keeping database access safe and maintainable.

---

## Features

* Oracle Database connectivity
* Connection pooling
* Read-only mode support
* SQL validation
* Metadata exploration
* Object discovery
* DDL extraction
* Stored procedure execution
* Function execution
* Transaction management
* Modular MCP tool registry
* Logging & audit middleware
* Environment-based configuration

---

## Project Structure

```text
.
├── src
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
│   │   ├── customer/
│   │   └── metadata/
│   ├── tools/
│   │   ├── customer/
│   │   └── database/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── docs/
├── tests/
├── logs/
├── package.json
├── .env.example
└── README.md
```

---

## Requirements

* Node.js 20+
* Oracle Database 19c or later
* Oracle Instant Client (when required)

---

## Installation

```bash
git clone https://github.com/danangpriabada/bob-oracle-mcp.git

cd bob-oracle-mcp

npm install

cp .env.example .env
```

---

## Environment

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

```bash
node src/server.js
```

or

```bash
npm start
```

---

## MCP Inspector

Install the inspector:

```bash
npm install -g @modelcontextprotocol/inspector
```

Run the server with the inspector:

```bash
npx @modelcontextprotocol/inspector node src/server.js
```

Remove the global installation if no longer needed:

```bash
npm uninstall -g @modelcontextprotocol/inspector
```

---

## Available Database Tools

| Tool              | Description                  |
| ----------------- | ---------------------------- |
| ping              | Test Oracle connectivity     |
| health            | Database health check        |
| current-user      | Get current Oracle user      |
| current-schema    | Get active schema            |
| database-version  | Retrieve Oracle version      |
| execute-sql       | Execute SQL statement        |
| explain-plan      | Generate execution plan      |
| describe-table    | Describe table structure     |
| get-ddl           | Retrieve object DDL          |
| list-tables       | List tables                  |
| list-views        | List views                   |
| list-columns      | List table columns           |
| search-columns    | Search columns across schema |
| list-indexes      | List indexes                 |
| list-constraints  | List constraints             |
| list-sequences    | List sequences               |
| list-packages     | List PL/SQL packages         |
| list-procedures   | List procedures              |
| search-object     | Search Oracle objects        |
| execute-function  | Execute Oracle function      |
| execute-procedure | Execute Oracle procedure     |

---

## Available Customer Tools

* create
* update
* delete
* get
* list

---

## Architecture

```text
MCP Client
      │
      ▼
 Registry
      │
      ▼
    Tools
      │
      ▼
  Services
      │
      ▼
Repositories
      │
      ▼
 Oracle Adapter
      │
      ▼
 Oracle Database
```

---

## Security

The project is designed with production deployments in mind.

* Read-only mode support
* SQL validation
* Permission layer
* Audit middleware
* Centralized error handling
* Modular registry for controlled tool exposure

---

## Roadmap

* Authentication & Authorization
* Role-based tool permissions
* OCI integration
* Oracle Thin Driver optimization
* Docker support
* Kubernetes deployment
* GitHub Actions CI/CD
* OpenTelemetry
* Unit tests
* Integration tests

---

## License

MIT

---

## Author

**Danang Priabada**

GitHub: https://github.com/danangpriabada
