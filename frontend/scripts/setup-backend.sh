#!/bin/bash

# IITDeveloper - Backend Setup Script
# Initializes PostgreSQL database and runs migrations

set -e  # Exit on error

echo "🚀 IITDeveloper Backend Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found. Creating from example...${NC}"
    cp .env.example .env.local
    echo -e "${YELLOW}Please edit .env.local with your database credentials${NC}"
    exit 1
fi

# Load environment variables
source .env.local

# Check if PostgreSQL is running
echo "📡 Checking PostgreSQL connection..."
if ! pg_isready -h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} > /dev/null 2>&1; then
    echo -e "${RED}❌ PostgreSQL is not running${NC}"
    echo ""
    echo "Please start PostgreSQL first:"
    echo "  macOS (Homebrew):  brew services start postgresql@15"
    echo "  Linux:             sudo systemctl start postgresql"
    echo "  Docker:            docker-compose up -d postgres"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL is running${NC}"
echo ""

# Check if database exists
echo "🔍 Checking if database exists..."
DB_EXISTS=$(psql -h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} -U ${POSTGRES_USER:-postgres} -lqt | cut -d \| -f 1 | grep -w ${POSTGRES_DB:-iitdeveloper} | wc -l)

if [ "$DB_EXISTS" -eq "0" ]; then
    echo "📦 Creating database: ${POSTGRES_DB:-iitdeveloper}"
    createdb -h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB:-iitdeveloper}
    echo -e "${GREEN}✅ Database created${NC}"
else
    echo -e "${YELLOW}⚠️  Database already exists${NC}"
fi

echo ""

# Run migrations
echo "🔧 Running database migrations..."
psql -h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-iitdeveloper} -f src/lib/db/schema.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations completed successfully${NC}"
else
    echo -e "${RED}❌ Migration failed${NC}"
    exit 1
fi

echo ""

# Verify tables
echo "🔍 Verifying tables..."
TABLE_COUNT=$(psql -h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-iitdeveloper} -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';")

echo "   Found $TABLE_COUNT tables"

if [ "$TABLE_COUNT" -ge "3" ]; then
    echo -e "${GREEN}✅ Database schema verified${NC}"
else
    echo -e "${YELLOW}⚠️  Expected at least 3 tables${NC}"
fi

echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${RED}❌ Dependency installation failed${NC}"
    exit 1
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Backend setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Review .env.local configuration"
echo "  2. Start development server: npm run dev"
echo "  3. Test API: curl http://localhost:3000/api/health"
echo "  4. Read API documentation: cat API.md"
echo ""
echo "🎉 Happy coding!"
