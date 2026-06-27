#!/bin/bash
# Run database migrations on Neon or any PostgreSQL database

set -e

echo "🗄️  Running Database Migrations"
echo "================================"
echo ""

# Load environment variables from .env.local
if [ -f .env.local ]; then
    echo "📄 Loading environment from .env.local..."
    export $(cat .env.local | grep -v '^#' | grep -v '^$' | xargs)
    echo ""
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo ""
    echo "Please add to .env.local:"
    echo "DATABASE_URL=postgresql://user:pass@host/database?sslmode=require"
    exit 1
fi

echo "✅ DATABASE_URL found"
echo ""

# Check if psql is installed
if command -v psql &> /dev/null; then
    echo "📊 Running schema.sql..."
    psql "$DATABASE_URL" < src/lib/db/schema.sql
    echo ""
    echo "✅ Schema migration complete!"
    echo ""
    
    echo "📊 Running migrations/002_services_pricing_leads.sql..."
    psql "$DATABASE_URL" < src/lib/db/migrations/002_services_pricing_leads.sql
    echo ""
    echo "✅ Services & leads migration complete!"
    echo ""
    
    echo "🎉 All migrations completed successfully!"
else
    echo "❌ psql command not found"
    echo ""
    echo "Please install PostgreSQL client:"
    echo "  macOS: brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql-client"
    echo ""
    echo "Or run migrations manually in Neon Console:"
    echo "1. Go to: https://console.neon.tech"
    echo "2. Open SQL Editor"
    echo "3. Copy contents of src/lib/db/schema.sql"
    echo "4. Paste and run"
    echo "5. Repeat for src/lib/db/migrations/002_services_pricing_leads.sql"
    exit 1
fi
