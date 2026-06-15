// Run database migrations using Node.js (no psql required)
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
}

loadEnvFile();

async function runMigrations() {
  console.log('🗄️  Running Database Migrations');
  console.log('================================\n');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set\n');
    console.error('Please add to .env.local:');
    console.error('DATABASE_URL=postgresql://user:pass@host/database?sslmode=require');
    process.exit(1);
  }

  console.log('✅ DATABASE_URL found\n');

  // Create connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Test connection
    console.log('🔌 Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Connected successfully\n');

    // Read schema.sql
    console.log('📊 Running schema.sql...');
    const schemaPath = path.join(__dirname, 'src', 'lib', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schema);
    console.log('✅ Schema migration complete!\n');

    // Read migrations/002_services_pricing_leads.sql
    console.log('📊 Running migrations/002_services_pricing_leads.sql...');
    const migration002Path = path.join(__dirname, 'src', 'lib', 'db', 'migrations', '002_services_pricing_leads.sql');
    
    if (fs.existsSync(migration002Path)) {
      const migration002 = fs.readFileSync(migration002Path, 'utf8');
      await pool.query(migration002);
      console.log('✅ Services & leads migration complete!\n');
    } else {
      console.log('⚠️  Migration file not found, skipping...\n');
    }

    console.log('🎉 All migrations completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
