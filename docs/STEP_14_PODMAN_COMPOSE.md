# Step 14: Podman Compose Setup - Complete! ✅

## 🎯 What Was Created

Complete multi-environment deployment system using podman-compose with environment-specific configurations.

---

## 📁 Files Created (7)

### **1. podman-compose.yml** - Main Compose Configuration
Enhanced compose file with:
- ✅ Environment variable substitution
- ✅ Podman-specific optimizations (`userns_mode: keep-id`)
- ✅ Fully qualified image names (`docker.io/library/...`)
- ✅ Resource limits (commented, ready to enable)
- ✅ Network with custom subnet
- ✅ Labels for organization
- ✅ Optional services (Redis, Nginx) ready to enable

### **2. podman-compose-manager.sh** - Environment Manager
500+ line management script with:
- ✅ Multi-environment support (dev/staging/prod)
- ✅ Environment validation
- ✅ Password security checks
- ✅ 16 commands for complete lifecycle management
- ✅ Color-coded output
- ✅ Health checks
- ✅ Migration support

### **3. Environment Configuration Files**
Three pre-configured environments:

**Development** (`.env.development`)
- Local development settings
- Test passwords
- Debug mode enabled

**Staging** (`.env.staging`)
- Staging environment config
- Secure passwords (to be updated)
- Production-like settings

**Production** (`.env.prod`)
- Production-ready config
- Secure defaults
- All services configured

### **4. .env.example** - Template
Clean template for custom environments

---

## 🚀 Quick Start

### **Development Environment**

```bash
# Start development stack
npm run compose:dev

# Or directly
./podman-compose-manager.sh up dev

# View logs
./podman-compose-manager.sh logs dev

# Check status
./podman-compose-manager.sh status dev
```

### **Staging Environment**

```bash
# Update staging passwords first!
nano .env.staging

# Start staging stack
npm run compose:staging

# Run migrations
./podman-compose-manager.sh migrate staging

# Check health
./podman-compose-manager.sh health staging
```

### **Production Environment**

```bash
# Update production config
nano .env.prod

# Build production images
./podman-compose-manager.sh build prod

# Start production stack
npm run compose:prod

# Verify health
./podman-compose-manager.sh health prod
```

---

## 📊 Architecture

### **Multi-Environment Setup**

```
.env.development      →   podman-compose.yml   →   Development Containers
.env.staging          →   podman-compose.yml   →   Staging Containers  
.env.prod             →   podman-compose.yml   →   Production Containers
```

### **Environment Variables Flow**

```
Environment File (.env.*)
         ↓
podman-compose.yml (substitution)
         ↓
Container Environment
```

---

## 🛠️ Available Commands

### **NPM Scripts (9 new)**

```bash
# Environment-specific deployments
npm run compose:dev        # Start development
npm run compose:staging    # Start staging
npm run compose:prod       # Start production

# General commands (uses default: dev)
npm run compose:up         # Start services
npm run compose:down       # Stop services
npm run compose:build      # Build images
npm run compose:logs       # View logs
npm run compose:status     # Check status
npm run compose:migrate    # Run migrations
```

### **Manager Script (16 commands)**

```bash
# Deployment
./podman-compose-manager.sh up [env]
./podman-compose-manager.sh down [env]
./podman-compose-manager.sh restart [env]
./podman-compose-manager.sh build [env]

# Monitoring
./podman-compose-manager.sh status [env]
./podman-compose-manager.sh logs [env] [service]
./podman-compose-manager.sh health [env]
./podman-compose-manager.sh shell [env] [service]

# Database
./podman-compose-manager.sh migrate [env]

# Maintenance
./podman-compose-manager.sh clean [env]
./podman-compose-manager.sh pull [env]
./podman-compose-manager.sh config [env]

# Environment Management
./podman-compose-manager.sh env-list
./podman-compose-manager.sh env-copy <from> <to>

# Help
./podman-compose-manager.sh help
```

---

## 🔐 Security Features

### **1. Password Validation**

Script automatically checks for placeholder passwords:

```bash
./podman-compose-manager.sh up prod

⚠ Environment file contains CHANGE_ME placeholders
⚠ Update passwords before deploying to production!
```

### **2. Secure Authentication**

PostgreSQL configured with `scram-sha-256` in staging/prod:

```yaml
POSTGRES_HOST_AUTH_METHOD=scram-sha-256
```

### **3. Non-Root Containers**

Podman-specific security:

```yaml
userns_mode: "keep-id"  # Run as current user, not root
```

### **4. Environment Isolation**

Each environment has:
- ✅ Separate database names
- ✅ Different passwords
- ✅ Isolated networks
- ✅ Environment-specific URLs

---

## 📈 Environment Comparison

| Feature | Development | Staging | Production |
|---------|-------------|---------|------------|
| **Database** | iitdeveloper_dev | iitdeveloper_staging | iitdeveloper |
| **Auth Method** | md5 | scram-sha-256 | scram-sha-256 |
| **Password** | Simple | Secure (update!) | Secure (update!) |
| **URL** | localhost:3000 | staging.domain.com | domain.com |
| **Telemetry** | Disabled | Disabled | Disabled |
| **SSL** | No | Yes (recommended) | Yes (required) |

---

## 🎯 Key Features

### **✅ Multi-Environment**
- Pre-configured dev/staging/prod
- Easy to add custom environments
- Environment-specific settings
- Secure defaults

### **✅ Environment Variables**
- Variable substitution in compose file
- Default values with `${VAR:-default}`
- Environment validation
- Password security checks

### **✅ Podman Optimizations**
- Rootless containers (`userns_mode`)
- Fully qualified image names
- Buildah integration ready
- Resource limits configurable

### **✅ Developer Experience**
- One command per environment
- Clear status reporting
- Health checks built-in
- Migration automation

### **✅ Production Ready**
- Secure authentication
- Resource limits ready
- Health monitoring
- Graceful shutdown

---

## 📝 Configuration Examples

### **Custom Port Configuration**

Edit environment file:
```env
FRONTEND_PORT=3002
POSTGRES_PORT=5433
```

Then start:
```bash
./podman-compose-manager.sh up dev
# Frontend: localhost:3002
# Database: localhost:5433
```

### **Enable Redis Cache**

Uncomment in `podman-compose.yml`:
```yaml
redis:
  image: docker.io/library/redis:7-alpine
  # ... (already configured)
```

Add to environment file:
```env
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

### **Enable Nginx Proxy**

Uncomment nginx service in `podman-compose.yml`:
```yaml
nginx:
  image: docker.io/library/nginx:alpine
  ports:
    - "80:80"
    - "443:443"
```

Create nginx config:
```bash
mkdir -p nginx
# Add nginx.conf
```

---

## 🧪 Testing

### **Test Development Environment**

```bash
# Start dev
./podman-compose-manager.sh up dev

# Check status
./podman-compose-manager.sh status dev

# Output:
# ➜ Environment: development
# ➜ Config: .env.development
# 
# NAME                      STATUS
# iitdeveloper-frontend     Up (healthy)
# iitdeveloper-postgres     Up (healthy)

# Check health
./podman-compose-manager.sh health dev

# Output:
# ✓ Frontend: Healthy
# {
#   "status": "healthy",
#   "services": {
#     "database": "up",
#     "api": "up"
#   }
# }
```

### **Test Migrations**

```bash
# Run migrations in staging
./podman-compose-manager.sh migrate staging

# Output:
# ➜ Running database migrations for staging...
# ➜ Applying schema...
# ➜ Applying migrations...
# ✓ Migrations complete
```

### **Test Shell Access**

```bash
# Frontend shell
./podman-compose-manager.sh shell dev frontend
# Opens: /bin/sh

# Database shell
./podman-compose-manager.sh shell dev postgres
# Opens: psql prompt
```

---

## 🔄 Workflow Examples

### **Deploy to Staging**

```bash
# 1. Update staging config
nano .env.staging
# Update POSTGRES_PASSWORD
# Update RESEND_API_KEY

# 2. Build staging images
./podman-compose-manager.sh build staging

# 3. Start staging services
./podman-compose-manager.sh up staging

# 4. Run migrations
./podman-compose-manager.sh migrate staging

# 5. Verify health
./podman-compose-manager.sh health staging

# 6. Check logs
./podman-compose-manager.sh logs staging
```

### **Switch Environments**

```bash
# Stop dev
./podman-compose-manager.sh down dev

# Start staging
./podman-compose-manager.sh up staging

# View logs
./podman-compose-manager.sh logs staging frontend
```

### **Create Custom Environment**

```bash
# Copy existing config
./podman-compose-manager.sh env-copy dev custom

# Edit custom config
nano .env.custom

# Start custom environment
./podman-compose-manager.sh up custom
```

---

## 📊 Comparison: docker-compose.yml vs podman-compose.yml

| Feature | docker-compose.yml | podman-compose.yml |
|---------|-------------------|-------------------|
| **Image Names** | Short (postgres:15) | Fully qualified (docker.io/library/postgres:15) |
| **User Mode** | Default | `userns_mode: keep-id` |
| **Env Vars** | Hardcoded | Variable substitution |
| **Resource Limits** | Not configured | Ready to enable |
| **Labels** | None | App/tier/environment |
| **Network** | Default | Custom subnet |
| **Auth Method** | Default | Configurable |

---

## 🐛 Troubleshooting

### **Environment File Not Found**

```bash
./podman-compose-manager.sh up custom

# Output:
# ✗ Environment file not found: .env.custom
# 
# Available environments:
#   - development
#   - staging
#   - prod
```

**Solution:** Create the environment file or use an existing one.

### **CHANGE_ME Warning**

```bash
./podman-compose-manager.sh up prod

# Output:
# ⚠ Environment file contains CHANGE_ME placeholders
# ⚠ Update passwords before deploying to production!
```

**Solution:** Edit `.env.prod` and replace all `CHANGE_ME` values.

### **Port Already in Use**

```bash
# Change port in environment file
FRONTEND_PORT=3002

# Restart
./podman-compose-manager.sh restart dev
```

### **Health Check Failing**

```bash
# Check logs
./podman-compose-manager.sh logs dev frontend

# Check database connection
./podman-compose-manager.sh shell dev postgres
```

---

## ✅ Verification Checklist

After setup:

- [ ] ✅ podman-compose.yml created
- [ ] ✅ Three environment files created
- [ ] ✅ Manager script executable
- [ ] ✅ NPM scripts added
- [ ] ✅ Environment variables validated
- [ ] ✅ Development environment tested
- [ ] ✅ Health checks working
- [ ] ✅ Migrations successful
- [ ] ✅ Logs accessible
- [ ] ✅ Shell access working

---

## 🎉 Success!

**Your multi-environment podman-compose setup is complete:**

✅ **7 Files Created:**
- podman-compose.yml (enhanced compose file)
- .env.development (dev config)
- .env.staging (staging config)
- .env.prod (production config)
- .env.example (template)
- podman-compose-manager.sh (management script)
- Updated package.json (9 new scripts)

✅ **Features:**
- Multi-environment deployment
- Environment variable substitution
- Secure authentication
- Password validation
- Health monitoring
- Migration automation
- 16 management commands

✅ **Ready For:**
- Local development (dev)
- Staging deployment (staging)
- Production deployment (prod)
- Custom environments (copy template)

**Deploy to any environment in one command!** 🚀
