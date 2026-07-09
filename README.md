# Oracle MCP
Production-ready Oracle MCP Server.

#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Creating Oracle MCP project structure..."

# ==========================================================
# Create directories
# ==========================================================
mkdir -p \
    docs \
    logs \
    tests/{unit,integration,fixtures,mocks} \
    src/{adapters,bootstrap,config,constants,context,db,exceptions,middleware,queries,registry,repositories,schemas,security,utils,validators} \
    src/services/{customer,metadata} \
    src/tools/{customer,database}

# Create .gitkeep in empty directories
find docs logs tests src -type d -empty -exec touch {}/.gitkeep \;

# ==========================================================
# Initialize npm
# ==========================================================
if [[ ! -f package.json ]]; then
    echo "📦 Initializing package.json..."
    npm init -y >/dev/null
fi

# ==========================================================
# Root files
# ==========================================================
touch .env

if [[ ! -f README.md ]]; then
cat > README.md <<'EOF'
# Oracle MCP

Production-ready Oracle MCP Server.
EOF
fi

if [[ ! -f .env.example ]]; then
cat > .env.example <<'EOF'
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
EOF
fi

if [[ ! -f .gitignore ]]; then
cat > .gitignore <<'EOF'
node_modules/
.env
logs/
coverage/
dist/
.vscode/
.idea/
.DS_Store
Thumbs.db
EOF
fi

# ==========================================================
# Create source files
# ==========================================================
touch \
src/app.js \
src/server.js \
src/bootstrap/database.js \
src/bootstrap/logger.js \
src/bootstrap/mcp.js \
src/adapters/oracle.adapter.js \
src/config/database.js \
src/config/env.js \
src/config/logger.js \
src/context/mcp.context.js \
src/db/pool.js \
src/db/transaction.js \
src/exceptions/AppError.js \
src/exceptions/DatabaseError.js \
src/exceptions/ValidationError.js \
src/middleware/audit.js \
src/middleware/error-handler.js \
src/middleware/logging.js \
src/queries/customer.queries.js \
src/queries/metadata.queries.js \
src/queries/package.queries.js \
src/registry/database.registry.js \
src/registry/customer.registry.js \
src/registry/index.js \
src/security/sql-validator.js \
src/security/readonly.js \
src/security/permissions.js \
src/repositories/base.repository.js \
src/repositories/customer.repository.js \
src/schemas/customer.schema.js \
src/schemas/sql.schema.js \
src/services/database.service.js \
src/services/transaction.service.js \
src/services/customer/customer.service.js \
src/services/metadata/table.service.js \
src/services/metadata/package.service.js \
src/services/metadata/procedure.service.js \
src/services/metadata/schema.service.js \
src/tools/database/current-schema.tool.js \
src/tools/database/current-user.tool.js \
src/tools/database/database-version.tool.js \
src/tools/database/describe-table.tool.js \
src/tools/database/execute-function.tool.js \
src/tools/database/execute-procedure.tool.js \
src/tools/database/execute-sql.tool.js \
src/tools/database/explain-plan.tool.js \
src/tools/database/health.tool.js \
src/tools/database/list-columns.tool.js \
src/tools/database/list-constraints.tool.js \
src/tools/database/list-indexes.tool.js \
src/tools/database/list-packages.tool.js \
src/tools/database/list-procedures.tool.js \
src/tools/database/list-sequences.tool.js \
src/tools/database/list-tables.tool.js \
src/tools/database/list-views.tool.js \
src/tools/database/ping.tool.js \
src/tools/customer/create.tool.js \
src/tools/customer/delete.tool.js \
src/tools/customer/get.tool.js \
src/tools/customer/list.tool.js \
src/tools/customer/update.tool.js \
src/utils/logger.js \
src/utils/response.js \
src/utils/validator.js

echo
echo "✅ Oracle MCP project scaffold created successfully!"
echo

if command -v tree >/dev/null 2>&1; then
    tree -a
else
    find . | sort
fi

echo
echo "🚀 Ready to build your Oracle MCP Server."

---
npm install -g @modelcontextprotocol/inspector
npm uninstall -g @modelcontextprotocol/inspector
npx @modelcontextprotocol/inspector node src/server.js
---