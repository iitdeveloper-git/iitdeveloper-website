#!/bin/bash

# IITDeveloper Database Initialization Script
# Runs SQL migrations and sets up the database schema

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
CONTAINER_NAME="iitdeveloper-postgres"
POSTGRES_DB="iitdeveloper"
POSTGRES_USER="postgres"
SCHEMA_FILE="src/lib/db/schema.sql"
MIGRATIONS_DIR="src/lib/db/migrations"

echo -e "${CYAN}🗄️  IITDeveloper Database Setup${NC}"
echo "================================"
echo ""

# Check if container is running
if ! podman inspect "$CONTAINER_NAME" --format '{{.State.Running}}' 2>/dev/null | grep -q true; then
    echo -e "${RED}❌ PostgreSQL container is not running${NC}"
    echo "Start it with: ./podman-postgres.sh start"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL container is running${NC}"
echo ""

# Check if schema file exists
if [ ! -f "$SCHEMA_FILE" ]; then
    echo -e "${RED}❌ Schema file not found: $SCHEMA_FILE${NC}"
    exit 1
fi

echo -e "${CYAN}📝 Running base schema...${NC}"
echo ""

# Run base schema
podman exec -i "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$SCHEMA_FILE"

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ Base schema failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Base schema applied${NC}"
echo ""

# Run migrations if directory exists
if [ -d "$MIGRATIONS_DIR" ]; then
    echo -e "${CYAN}📝 Running migrations...${NC}"
    echo ""
    
    # Sort migration files numerically
    for migration in $(ls "$MIGRATIONS_DIR"/*.sql 2>/dev/null | sort -V); do
        if [ -f "$migration" ]; then
            migration_name=$(basename "$migration")
            echo -e "${CYAN}  → Running $migration_name${NC}"
            podman exec -i "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$migration"
            
            if [ $? -ne 0 ]; then
                echo ""
                echo -e "${RED}❌ Migration failed: $migration_name${NC}"
                exit 1
            fi
        fi
    done
    
    echo ""
    echo -e "${GREEN}✅ All migrations applied${NC}"
fi

echo ""
echo -e "${GREEN}✅ Database initialized successfully!${NC}"
echo ""

# Show created tables
echo -e "${CYAN}📊 Database tables:${NC}"
podman exec "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\dt"

echo ""
echo -e "${CYAN}📈 Database views:${NC}"
podman exec "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\dv"

echo ""
echo -e "${GREEN}✅ Ready to start development!${NC}"
echo "Start the app with: npm run dev"
