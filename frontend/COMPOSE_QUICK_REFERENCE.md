# Podman Compose Quick Reference

## 🚀 Quick Commands

### Start Environments
```bash
# Development
npm run compose:dev
./podman-compose-manager.sh up dev

# Staging  
npm run compose:staging
./podman-compose-manager.sh up staging

# Production
npm run compose:prod
./podman-compose-manager.sh up prod
```

### Stop Environments
```bash
./podman-compose-manager.sh down dev
./podman-compose-manager.sh down staging
./podman-compose-manager.sh down prod
```

### View Logs
```bash
# All services
./podman-compose-manager.sh logs dev

# Specific service
./podman-compose-manager.sh logs dev frontend
./podman-compose-manager.sh logs dev postgres
```

### Check Status
```bash
./podman-compose-manager.sh status dev
./podman-compose-manager.sh health dev
```

### Database Operations
```bash
# Run migrations
./podman-compose-manager.sh migrate dev

# Open database shell
./podman-compose-manager.sh shell dev postgres
```

### Environment Management
```bash
# List environments
./podman-compose-manager.sh env-list

# Copy environment
./podman-compose-manager.sh env-copy dev custom

# Validate configuration
./podman-compose-manager.sh config dev
```

## 📁 Environment Files

- `.env.development` - Development config (default)
- `.env.staging` - Staging config
- `.env.prod` - Production config
- `.env.example` - Template for custom environments

## 🔐 Before Production

1. Update passwords in `.env.prod`
2. Set `RESEND_API_KEY` for emails
3. Update `NEXT_PUBLIC_APP_URL` to your domain
4. Generate `NEXTAUTH_SECRET` if using auth
5. Review resource limits in `podman-compose.yml`

## 📊 Key Variables

### Database
```env
POSTGRES_DB=iitdeveloper
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_HOST_AUTH_METHOD=scram-sha-256
```

### Application
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
RESEND_API_KEY=your_key
FROM_EMAIL=noreply@domain.com
```

### Ports
```env
FRONTEND_PORT=3000
POSTGRES_PORT=5432
```

## 🎯 Workflow

### Deploy to Staging
```bash
# 1. Update config
nano .env.staging

# 2. Build
./podman-compose-manager.sh build staging

# 3. Start
./podman-compose-manager.sh up staging

# 4. Migrate
./podman-compose-manager.sh migrate staging

# 5. Check
./podman-compose-manager.sh health staging
```

### Deploy to Production
```bash
# 1. Update config
nano .env.prod

# 2. Build
./podman-compose-manager.sh build prod

# 3. Start
./podman-compose-manager.sh up prod

# 4. Migrate
./podman-compose-manager.sh migrate prod

# 5. Verify
./podman-compose-manager.sh health prod
./podman-compose-manager.sh logs prod
```

## 🐛 Troubleshooting

### Port Conflict
```bash
# Edit environment file
nano .env.development

# Change port
FRONTEND_PORT=3002

# Restart
./podman-compose-manager.sh restart dev
```

### View Logs
```bash
# All logs
./podman-compose-manager.sh logs dev

# Follow logs
./podman-compose-manager.sh logs dev -f

# Specific service
./podman-compose-manager.sh logs dev frontend
```

### Database Issues
```bash
# Check postgres health
./podman-compose-manager.sh status dev

# Open shell
./podman-compose-manager.sh shell dev postgres

# Run query
psql> SELECT * FROM services;
```

## 🔄 Switching Environments

```bash
# Stop dev
./podman-compose-manager.sh down dev

# Start staging
./podman-compose-manager.sh up staging

# Or run both on different ports
# Edit .env.staging: FRONTEND_PORT=3001
```

## ✅ Health Check

```bash
# Check application health
curl http://localhost:3000/api/health

# Or use manager
./podman-compose-manager.sh health dev
```

## 📦 Optional Services

### Enable Redis
Uncomment in `podman-compose.yml`:
```yaml
redis:
  image: docker.io/library/redis:7-alpine
  # ... (already configured)
```

Add to `.env.*`:
```env
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

### Enable Nginx
Uncomment nginx service in `podman-compose.yml` and create nginx config.

## 🆘 Get Help

```bash
./podman-compose-manager.sh help
```
