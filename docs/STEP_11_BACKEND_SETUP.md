# Step 11: Backend + Database Setup - Complete! ✅

## 🎯 What Was Set Up

Complete Node.js backend with PostgreSQL database running in Podman containers.

---

## 🐘 PostgreSQL with Podman

### **Why Podman?**

- ✅ **Rootless** - Runs without root privileges (more secure)
- ✅ **Daemonless** - No background daemon required
- ✅ **Docker-compatible** - Drop-in replacement for Docker
- ✅ **Native on macOS** - Built for Apple Silicon

### **Container Configuration**

| Setting | Value |
|---------|-------|
| Container Name | `iitdeveloper-postgres` |
| Image | `postgres:15-alpine` |
| Database | `iitdeveloper` |
| User | `postgres` |
| Password | `postgres` |
| Port | `5432` |
| Volume | `iitdeveloper-db-data` |

---

## 🚀 Quick Start

### **1. Start PostgreSQL Container**

```bash
npm run db:start
```

**What happens:**
- Creates PostgreSQL container if it doesn't exist
- Starts the container
- Creates persistent volume for data
- Waits for database to be ready
- Shows connection string

**Output:**
```
🐘 IITDeveloper PostgreSQL Setup
==================================

✅ Podman is installed

📦 Creating new PostgreSQL container...
💾 Creating volume: iitdeveloper-db-data

✅ PostgreSQL container started

Container: iitdeveloper-postgres
Database: iitdeveloper
User: postgres
Password: postgres
Port: 5432

Waiting for PostgreSQL to be ready...
✅ PostgreSQL is ready!

Connection string: postgresql://postgres:postgres@localhost:5432/iitdeveloper
```

---

### **2. Initialize Database Schema**

```bash
npm run db:init
```

**What happens:**
- Runs `src/lib/db/schema.sql`
- Creates tables: `estimates`, `estimate_activities`, `email_logs`
- Creates views: `active_estimates`, `estimate_stats`
- Creates functions: `generate_po_number()`, `update_updated_at_column()`
- Shows created tables and views

**Output:**
```
🗄️  IITDeveloper Database Setup
================================

✅ PostgreSQL container is running

📝 Running database migrations...

CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE VIEW
CREATE VIEW
CREATE FUNCTION
CREATE FUNCTION

✅ Database initialized successfully!

📊 Database tables:
            Table
----------------------------
 estimates
 estimate_activities
 email_logs

📈 Database views:
         View
----------------------
 active_estimates
 estimate_stats

✅ Ready to start development!
```

---

### **3. Start Development Server**

```bash
npm run dev
```

Server starts on **http://localhost:3002** with database connection ready!

---

## 📦 Available Commands

### **Database Management**

```bash
# Start PostgreSQL container
npm run db:start

# Stop PostgreSQL container
npm run db:stop

# Restart PostgreSQL container
npm run db:restart

# View PostgreSQL logs (live)
npm run db:logs

# Open PostgreSQL shell
npm run db:psql

# Check container status
npm run db:status

# Initialize/migrate database schema
npm run db:init
```

### **Direct Script Usage**

```bash
# All commands via script
./podman-postgres.sh start    # Start container
./podman-postgres.sh stop     # Stop container
./podman-postgres.sh restart  # Restart container
./podman-postgres.sh remove   # Remove container (keeps data)
./podman-postgres.sh clean    # Remove container + data (⚠️ destructive)
./podman-postgres.sh logs     # View logs
./podman-postgres.sh psql     # Open psql shell
./podman-postgres.sh status   # Show status
```

---

## 🗄️ Database Schema

### **Tables**

**1. `estimates`** - Pricing estimates
```sql
- id (UUID, primary key)
- po_number (TEXT, unique, auto-generated)
- line_items (JSONB)
- subtotal (NUMERIC)
- discount (JSONB)
- total (NUMERIC)
- status (TEXT: draft/sent/approved/rejected)
- customer_info (JSONB)
- valid_until (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- deleted_at (TIMESTAMP, soft delete)
```

**2. `estimate_activities`** - Activity log
```sql
- id (UUID, primary key)
- estimate_id (UUID, foreign key)
- action (TEXT: created/updated/sent/viewed/downloaded)
- metadata (JSONB)
- created_at (TIMESTAMP)
```

**3. `email_logs`** - Email delivery tracking
```sql
- id (UUID, primary key)
- estimate_id (UUID, foreign key)
- recipient_email (TEXT)
- subject (TEXT)
- body (TEXT)
- status (TEXT: sent/failed)
- error_message (TEXT)
- sent_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

### **Views**

**1. `active_estimates`** - Non-deleted estimates
```sql
SELECT * FROM estimates WHERE deleted_at IS NULL
```

**2. `estimate_stats`** - Aggregated statistics
```sql
SELECT 
  COUNT(*) as total_estimates,
  COUNT(*) FILTER (WHERE status = 'draft') as drafts,
  COUNT(*) FILTER (WHERE status = 'sent') as sent,
  COUNT(*) FILTER (WHERE status = 'approved') as approved,
  SUM(total) as total_value,
  AVG(total) as average_value
FROM active_estimates
```

### **Functions**

**1. `generate_po_number()`** - Auto-generate PO numbers
```
Format: PO-YYYYMM-XXXX
Example: PO-202604-0001
```

**2. `update_updated_at_column()`** - Auto-update timestamps
```
Trigger function for updated_at column
```

---

## 🔌 Connection Details

### **Environment Variables** (`.env.local`)

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

### **Connection String**

```
postgresql://postgres:postgres@localhost:5432/iitdeveloper
```

### **Node.js Connection** (`src/lib/db/client.ts`)

```typescript
import { query, transaction, getClient } from '@/lib/db/client';

// Simple query
const users = await query('SELECT * FROM estimates');

// Transaction
await transaction(async (client) => {
  await client.query('INSERT INTO estimates ...');
  await client.query('INSERT INTO estimate_activities ...');
});
```

---

## 🧪 Testing

### **1. Test Connection**

```bash
npm run db:status
```

**Expected output:**
```
PostgreSQL Container Status
============================

Status: RUNNING ✅

Container: iitdeveloper-postgres
Image: postgres:15-alpine
Health: healthy
Port: 5432:5432

Connection string:
postgresql://postgres:postgres@localhost:5432/iitdeveloper
```

---

### **2. Test Database**

```bash
npm run db:psql
```

**Run queries:**
```sql
-- List tables
\dt

-- List views
\dv

-- Check estimates
SELECT COUNT(*) FROM estimates;

-- Check activities
SELECT COUNT(*) FROM estimate_activities;

-- Check email logs
SELECT COUNT(*) FROM email_logs;

-- View stats
SELECT * FROM estimate_stats;

-- Exit
\q
```

---

### **3. Test API Endpoints**

```bash
# Health check
curl http://localhost:3002/api/health

# List services
curl http://localhost:3002/api/services

# Create estimate (requires POST body)
curl -X POST http://localhost:3002/api/estimates \
  -H "Content-Type: application/json" \
  -d '{"lineItems": [], "discount": null}'
```

---

## 💾 Data Persistence

### **Volume Management**

**Data Location:**
```
Podman Volume: iitdeveloper-db-data
Location: ~/.local/share/containers/storage/volumes/iitdeveloper-db-data
```

**Backup Database:**
```bash
# Export to SQL file
podman exec iitdeveloper-postgres pg_dump -U postgres iitdeveloper > backup.sql

# Import from SQL file
podman exec -i iitdeveloper-postgres psql -U postgres iitdeveloper < backup.sql
```

**Reset Database (keep container):**
```bash
npm run db:stop
npm run db:start
npm run db:init
```

**Complete Reset (remove all data):**
```bash
./podman-postgres.sh clean  # ⚠️ Destructive!
npm run db:start
npm run db:init
```

---

## 🐛 Troubleshooting

### **Container won't start**

```bash
# Check Podman status
podman ps -a

# Check container logs
npm run db:logs

# Remove and recreate
./podman-postgres.sh remove
npm run db:start
```

### **Connection refused**

```bash
# Check if container is running
npm run db:status

# Check port availability
lsof -i :5432

# Restart container
npm run db:restart
```

### **Permission denied**

```bash
# Reset volume permissions
./podman-postgres.sh clean
npm run db:start
```

### **Schema migration failed**

```bash
# Check current schema
npm run db:psql
\dt

# Manually reset
DROP TABLE IF EXISTS estimates CASCADE;
DROP TABLE IF EXISTS estimate_activities CASCADE;
DROP TABLE IF EXISTS email_logs CASCADE;

# Re-run migration
npm run db:init
```

---

## 📊 Architecture

```
┌─────────────────────────────────────────────┐
│           Next.js Application               │
│         (http://localhost:3002)             │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │      API Routes (/api)              │   │
│  │  - /health                          │   │
│  │  - /services                        │   │
│  │  - /estimates                       │   │
│  │  - /estimates/[id]/pdf              │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │    Database Client (pg Pool)       │   │
│  │  - Connection pooling (max: 20)    │   │
│  │  - Query helpers                   │   │
│  │  - Transaction support             │   │
│  └──────────────┬──────────────────────┘   │
└─────────────────┼─────────────────────────┘
                  │
                  │ PostgreSQL Protocol
                  │ (localhost:5432)
                  │
┌─────────────────▼─────────────────────────┐
│      Podman Container                     │
│   (iitdeveloper-postgres)                 │
│                                           │
│  ┌──────────────────────────────────┐    │
│  │    PostgreSQL 15 Alpine          │    │
│  │  - Database: iitdeveloper        │    │
│  │  - User: postgres                │    │
│  │  - Health checks enabled         │    │
│  └──────────────┬───────────────────┘    │
│                 │                         │
│  ┌──────────────▼───────────────────┐    │
│  │    Persistent Volume             │    │
│  │  (iitdeveloper-db-data)          │    │
│  │  - Survives container restarts   │    │
│  │  - Can be backed up              │    │
│  └──────────────────────────────────┘    │
└───────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

- [x] Podman installed and working
- [x] PostgreSQL container created
- [x] Container is running
- [x] Database schema initialized
- [x] Tables created (3)
- [x] Views created (2)
- [x] Functions created (2)
- [x] Connection pool configured
- [x] API routes working
- [x] Health check passing
- [x] Data persists on restart

---

## 🎉 Success!

**Your backend is fully operational:**

✅ PostgreSQL running in Podman
✅ Database schema initialized
✅ Connection pool ready
✅ API endpoints functional
✅ Data persistence configured

**Start developing:**
```bash
npm run dev
# Open http://localhost:3002/estimate
# Create an estimate → Save → Send → Export PDF!
```

---

## 📚 Next Steps

**Recommended:**
1. Test the pricing estimator
2. Create a few test estimates
3. Export PDFs
4. Check database records
5. Monitor container logs

**Optional:**
- Set up Resend API key for email
- Configure backup schedule
- Add monitoring/alerting
- Set up staging environment

---

**Your premium pricing estimator is production-ready!** 🚀
