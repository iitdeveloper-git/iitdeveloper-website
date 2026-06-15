# IITDeveloper - Container Deployment Guide

Complete guide for running IITDeveloper with Podman containers.

---

## 🐳 Container Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Network                         │
│                (iitdeveloper-network)                    │
│                                                          │
│  ┌──────────────────────┐    ┌────────────────────┐   │
│  │   Frontend Container │    │  Postgres Container │   │
│  │   (Next.js App)      │◄───┤  (Database)        │   │
│  │                      │    │                    │   │
│  │  • Next.js 14        │    │  • PostgreSQL 15    │   │
│  │  • API Routes        │    │  • Data Volume      │   │
│  │  • Port: 3000        │    │  • Port: 5432       │   │
│  │  • Node 20 Alpine    │    │  • Alpine Linux     │   │
│  └──────────────────────┘    └────────────────────┘   │
│           ▲                           ▲                 │
└───────────┼───────────────────────────┼─────────────────┘
            │                           │
            │                           │
      Host: 3000                  Host: 5432
```

---

## 🚀 Quick Start

### **1. Prerequisites**

```bash
# Install Podman
brew install podman

# Optional: Install podman-compose (or use built-in podman compose)
pip3 install podman-compose
```

### **2. Build Containers**

```bash
# Build all images
npm run container:build

# Or use the script directly
./podman-stack.sh build
```

### **3. Start Services**

```bash
# Start all services in background
npm run container:up

# Or with logs (foreground)
./podman-stack.sh dev
```

### **4. Run Migrations**

```bash
# Initialize database schema
npm run container:migrate
```

### **5. Access Application**

```
🌐 Frontend: http://localhost:3000
🗄️ Database: localhost:5432
📊 Health Check: http://localhost:3000/api/health
```

---

## 📦 Container Details

### **Frontend Container**

**Base Image:** `node:20-alpine`

**Multi-stage Build:**
1. **Dependencies Stage** - Install npm packages
2. **Builder Stage** - Build Next.js app
3. **Runner Stage** - Production runtime (minimal)

**Features:**
- ✅ Standalone Next.js output
- ✅ Non-root user (nextjs:1001)
- ✅ Health checks enabled
- ✅ Optimized layer caching
- ✅ Only 3 stages, minimal size

**Environment Variables:**
```env
NODE_ENV=production
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Exposed Ports:**
- `3000` - HTTP server

**Health Check:**
```bash
node -e "require('http').get('http://localhost:3000/api/health', ...)"
```
- Interval: 30s
- Timeout: 10s
- Retries: 3
- Start period: 60s

---

### **PostgreSQL Container**

**Base Image:** `postgres:15-alpine`

**Features:**
- ✅ Auto-initialization with schema
- ✅ Persistent data volume
- ✅ Health checks enabled
- ✅ Migration scripts on startup

**Environment Variables:**
```env
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

**Exposed Ports:**
- `5432` - PostgreSQL server

**Volumes:**
- `postgres_data:/var/lib/postgresql/data` - Persistent storage
- `./src/lib/db/schema.sql:/docker-entrypoint-initdb.d/001_schema.sql` - Base schema
- `./src/lib/db/migrations:/docker-entrypoint-initdb.d/migrations` - Migration scripts

**Health Check:**
```bash
pg_isready -U postgres -d iitdeveloper
```
- Interval: 10s
- Timeout: 5s
- Retries: 5

---

## 🛠️ Available Commands

### **NPM Scripts**

```bash
# Build containers
npm run container:build

# Start services (background)
npm run container:up

# Stop services
npm run container:down

# Restart services
npm run container:restart

# View logs
npm run container:logs

# Check status
npm run container:status

# Run migrations
npm run container:migrate

# Clean everything
npm run container:clean
```

### **Direct Script Usage**

```bash
# Start in development mode (with logs)
./podman-stack.sh dev

# Build images
./podman-stack.sh build

# Start services
./podman-stack.sh up

# Stop services
./podman-stack.sh down

# View logs (all services)
./podman-stack.sh logs

# View logs (specific service)
./podman-stack.sh logs frontend
./podman-stack.sh logs postgres

# Check status
./podman-stack.sh status

# View resource usage
./podman-stack.sh stats

# Open shell in container
./podman-stack.sh shell frontend
./podman-stack.sh shell postgres

# Run database migrations
./podman-stack.sh migrate

# Clean everything (removes volumes!)
./podman-stack.sh clean

# Show help
./podman-stack.sh help
```

---

## 🔧 Configuration

### **Environment Variables**

**Development (`.env.local`):**
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production (`.env.production`):**
```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres_secure_password
NEXT_PUBLIC_APP_URL=http://your-domain.com
```

**Docker Compose Override:**

Create `docker-compose.override.yml` for local customization:
```yaml
version: '3.8'

services:
  frontend:
    environment:
      - RESEND_API_KEY=your_key_here
    ports:
      - "3002:3000"  # Use different port
  
  postgres:
    ports:
      - "5433:5432"  # Use different port
```

---

## 📊 Monitoring

### **Health Checks**

```bash
# Check application health
curl http://localhost:3000/api/health

# Response:
{
  "status": "healthy",
  "timestamp": "2026-04-25T10:30:00.000Z",
  "services": {
    "database": "up",
    "api": "up"
  },
  "version": "1.0.0"
}
```

### **Container Status**

```bash
# Check all containers
./podman-stack.sh status

# Output:
╔════════════════════════════════════════════════════════╗
║                                                        ║
║           🐳 IITDeveloper Container Manager           ║
║                                                        ║
╚════════════════════════════════════════════════════════╝

➜ Container Status

NAME                       IMAGE                    STATUS
iitdeveloper-frontend      localhost/frontend:latest Up 2 minutes (healthy)
iitdeveloper-postgres      postgres:15-alpine       Up 2 minutes (healthy)

➜ Health Status

✓ Frontend: Running (healthy)
✓ PostgreSQL: Running (healthy)
```

### **Resource Usage**

```bash
./podman-stack.sh stats

# Output:
NAME                    CPU %    MEM USAGE / LIMIT     NET I/O         BLOCK I/O
iitdeveloper-frontend   0.50%    150MiB / 2GiB        1.2MB / 850kB    0B / 4.1MB
iitdeveloper-postgres   0.10%    45MiB / 1GiB         850kB / 1.2MB    12kB / 8.2MB
```

### **Logs**

```bash
# All services
./podman-stack.sh logs

# Specific service
./podman-stack.sh logs frontend

# Follow logs
./podman-stack.sh logs frontend -f

# Last 100 lines
./podman-stack.sh logs frontend --tail 100
```

---

## 🗄️ Database Management

### **Access Database**

```bash
# PostgreSQL shell
./podman-stack.sh shell postgres

# Or directly
podman exec -it iitdeveloper-postgres psql -U postgres -d iitdeveloper
```

### **Run Migrations**

```bash
# Run all migrations
./podman-stack.sh migrate

# Manual migration
podman exec -i iitdeveloper-postgres psql -U postgres -d iitdeveloper < src/lib/db/schema.sql
```

### **Backup Database**

```bash
# Create backup
podman exec iitdeveloper-postgres pg_dump -U postgres iitdeveloper > backup_$(date +%Y%m%d).sql

# Restore backup
podman exec -i iitdeveloper-postgres psql -U postgres iitdeveloper < backup_20260425.sql
```

### **Reset Database**

```bash
# Stop containers
./podman-stack.sh down

# Remove volumes
podman volume rm iitdeveloper_postgres_data

# Start fresh
./podman-stack.sh up
./podman-stack.sh migrate
```

---

## 🚢 Production Deployment

### **1. Update Configuration**

```bash
# Edit .env.production
nano .env.production

# Update:
# - POSTGRES_PASSWORD (use strong password)
# - RESEND_API_KEY (for email)
# - NEXT_PUBLIC_APP_URL (your domain)
```

### **2. Build Production Images**

```bash
# Build with production config
NODE_ENV=production ./podman-stack.sh build
```

### **3. Deploy**

```bash
# Start services
./podman-stack.sh up

# Run migrations
./podman-stack.sh migrate

# Check health
curl http://localhost:3000/api/health
```

### **4. Enable Auto-restart**

The `docker-compose.yml` already includes `restart: unless-stopped` for all services.

### **5. Set Up Reverse Proxy (Optional)**

**Nginx Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🐛 Troubleshooting

### **Container Won't Start**

```bash
# Check logs
./podman-stack.sh logs frontend

# Check status
./podman-stack.sh status

# Rebuild from scratch
./podman-stack.sh clean
./podman-stack.sh build
./podman-stack.sh up
```

### **Database Connection Issues**

```bash
# Check postgres is healthy
./podman-stack.sh status

# Check network connectivity
podman exec iitdeveloper-frontend ping postgres

# Check database credentials
./podman-stack.sh shell postgres
psql -U postgres -d iitdeveloper
```

### **Port Already in Use**

```bash
# Check what's using the port
lsof -i :3000
lsof -i :5432

# Kill the process or change ports in docker-compose.yml
```

### **Out of Disk Space**

```bash
# Clean up unused images
podman image prune -a

# Clean up volumes (⚠️ removes data!)
podman volume prune

# Clean up containers
podman container prune
```

### **Build Fails**

```bash
# Clear build cache
podman builder prune

# Check .dockerignore
cat .dockerignore

# Build with no cache
podman build --no-cache -f Containerfile -t iitdeveloper-frontend .
```

---

## 📁 File Structure

```
frontend/
├── Containerfile              # Frontend container definition
├── .dockerignore              # Files to exclude from image
├── docker-compose.yml         # Multi-container orchestration
├── podman-stack.sh            # Container management script
├── .env.local                 # Development environment
├── .env.production            # Production environment
├── src/
│   ├── app/
│   │   └── api/
│   │       └── health/        # Health check endpoint
│   └── lib/
│       └── db/
│           ├── schema.sql     # Base database schema
│           └── migrations/    # Database migrations
└── ...
```

---

## 🔐 Security Considerations

### **Production Checklist**

- [ ] Change default PostgreSQL password
- [ ] Use secrets management (not .env files in production)
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up firewall rules
- [ ] Run containers as non-root users (already configured)
- [ ] Regular security updates for base images
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerting
- [ ] Regular database backups
- [ ] Restrict database access to frontend container only

### **Network Security**

```yaml
# In docker-compose.yml, postgres doesn't expose ports externally
postgres:
  # Don't expose ports in production
  # ports:
  #   - "5432:5432"
  networks:
    - iitdeveloper-network
```

---

## 🎯 Performance Optimization

### **Container Size**

```bash
# Check image sizes
podman images | grep iitdeveloper

# Typical sizes:
# - Frontend: ~200MB (Alpine-based, multi-stage build)
# - Postgres: ~240MB (Alpine-based)
```

### **Build Cache**

The multi-stage build optimizes layer caching:
1. Dependencies layer (changes rarely)
2. Application code layer (changes frequently)
3. Production runtime (minimal)

### **Resource Limits**

Add to `docker-compose.yml`:
```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

---

## ✅ Success Checklist

After deployment, verify:

- [ ] ✅ Containers are running: `./podman-stack.sh status`
- [ ] ✅ Health checks passing: `curl http://localhost:3000/api/health`
- [ ] ✅ Database connected: Check health endpoint
- [ ] ✅ Migrations applied: Check database tables
- [ ] ✅ Frontend accessible: Visit http://localhost:3000
- [ ] ✅ API endpoints working: Test /api/services
- [ ] ✅ Logs are clean: `./podman-stack.sh logs`
- [ ] ✅ Resource usage acceptable: `./podman-stack.sh stats`

---

## 🆘 Support

**Container Issues:**
- Check logs: `./podman-stack.sh logs`
- Verify status: `./podman-stack.sh status`
- Rebuild: `./podman-stack.sh build`

**Database Issues:**
- Access shell: `./podman-stack.sh shell postgres`
- Check migrations: `./podman-stack.sh migrate`
- Verify connectivity: Test health endpoint

**Network Issues:**
- Verify containers are on same network
- Check firewall rules
- Test port availability

---

**Your containerized IITDeveloper platform is production-ready!** 🚀
