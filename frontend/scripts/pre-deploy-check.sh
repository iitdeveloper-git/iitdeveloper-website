#!/bin/bash

# Pre-deployment checks for container deployment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🔍 Pre-Deployment Checks${NC}"
echo "========================"
echo ""

# Check 1: Podman installed
echo -n "Checking Podman... "
if command -v podman &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "Error: Podman is not installed"
    echo "Install with: brew install podman"
    exit 1
fi

# Check 2: Required files exist
echo -n "Checking required files... "
REQUIRED_FILES=(
    "Containerfile"
    "docker-compose.yml"
    ".dockerignore"
    "package.json"
    "next.config.js"
)

MISSING_FILES=()
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "Missing files:"
    for file in "${MISSING_FILES[@]}"; do
        echo "  - $file"
    done
    exit 1
fi

# Check 3: Environment variables
echo -n "Checking environment configuration... "
if [ ! -f ".env.local" ] && [ ! -f ".env.production" ]; then
    echo -e "${YELLOW}⚠${NC}"
    echo "Warning: No environment file found (.env.local or .env.production)"
else
    echo -e "${GREEN}✓${NC}"
fi

# Check 4: Port availability
echo -n "Checking port 3000... "
if lsof -Pi :3000 -sTCP:LISTEN -t &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}"
    echo "Warning: Port 3000 is already in use"
    lsof -Pi :3000 -sTCP:LISTEN
else
    echo -e "${GREEN}✓${NC}"
fi

echo -n "Checking port 5432... "
if lsof -Pi :5432 -sTCP:LISTEN -t &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}"
    echo "Warning: Port 5432 is already in use"
    lsof -Pi :5432 -sTCP:LISTEN
else
    echo -e "${GREEN}✓${NC}"
fi

# Check 5: Disk space
echo -n "Checking disk space... "
AVAILABLE_SPACE=$(df -h . | awk 'NR==2 {print $4}' | sed 's/G//')
if [ "${AVAILABLE_SPACE%.*}" -lt 2 ]; then
    echo -e "${YELLOW}⚠${NC}"
    echo "Warning: Low disk space (${AVAILABLE_SPACE}G available)"
else
    echo -e "${GREEN}✓${NC}"
fi

# Check 6: Node modules
echo -n "Checking dependencies... "
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠${NC}"
    echo "Warning: node_modules not found. Run: npm install --legacy-peer-deps"
else
    echo -e "${GREEN}✓${NC}"
fi

echo ""
echo -e "${GREEN}✓ Pre-deployment checks complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Build containers: ./podman-stack.sh build"
echo "  2. Start services: ./podman-stack.sh up"
echo "  3. Run migrations: ./podman-stack.sh migrate"
echo "  4. Check health: curl http://localhost:3000/api/health"
