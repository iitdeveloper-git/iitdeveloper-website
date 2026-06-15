#!/bin/bash

# IITDeveloper PostgreSQL Container Setup with Podman
# This script sets up a PostgreSQL container for development

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="iitdeveloper-postgres"
POSTGRES_VERSION="15-alpine"
POSTGRES_DB="iitdeveloper"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_PORT="5432"
DATA_VOLUME="iitdeveloper-db-data"

echo -e "${CYAN}🐘 IITDeveloper PostgreSQL Setup${NC}"
echo "=================================="
echo ""

# Check if Podman is installed
if ! command -v podman &> /dev/null; then
    echo -e "${RED}❌ Podman is not installed${NC}"
    echo "Install it with: brew install podman"
    exit 1
fi

echo -e "${GREEN}✅ Podman is installed${NC}"
echo ""

# Function to check if container exists
container_exists() {
    podman container exists "$CONTAINER_NAME" 2>/dev/null
}

# Function to check if container is running
container_running() {
    [ "$(podman inspect -f '{{.State.Running}}' "$CONTAINER_NAME" 2>/dev/null)" == "true" ]
}

# Parse command
COMMAND=${1:-start}

case "$COMMAND" in
    start)
        echo -e "${CYAN}Starting PostgreSQL container...${NC}"
        
        if container_running; then
            echo -e "${YELLOW}⚠️  Container is already running${NC}"
            echo "Use 'podman ps' to see running containers"
            exit 0
        fi
        
        if container_exists; then
            echo -e "${YELLOW}📦 Container exists, starting...${NC}"
            podman start "$CONTAINER_NAME"
        else
            echo -e "${CYAN}📦 Creating new PostgreSQL container...${NC}"
            
            # Create volume if it doesn't exist
            if ! podman volume exists "$DATA_VOLUME" 2>/dev/null; then
                echo -e "${CYAN}💾 Creating volume: $DATA_VOLUME${NC}"
                podman volume create "$DATA_VOLUME"
            fi
            
            # Run PostgreSQL container
            podman run -d \
                --name "$CONTAINER_NAME" \
                -e POSTGRES_DB="$POSTGRES_DB" \
                -e POSTGRES_USER="$POSTGRES_USER" \
                -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
                -p "$POSTGRES_PORT:5432" \
                -v "$DATA_VOLUME:/var/lib/postgresql/data" \
                --health-cmd "pg_isready -U $POSTGRES_USER -d $POSTGRES_DB" \
                --health-interval 10s \
                --health-timeout 5s \
                --health-retries 5 \
                --tls-verify=false \
                "postgres:$POSTGRES_VERSION"
        fi
        
        echo ""
        echo -e "${GREEN}✅ PostgreSQL container started${NC}"
        echo ""
        echo "Container: $CONTAINER_NAME"
        echo "Database: $POSTGRES_DB"
        echo "User: $POSTGRES_USER"
        echo "Password: $POSTGRES_PASSWORD"
        echo "Port: $POSTGRES_PORT"
        echo ""
        echo "Waiting for PostgreSQL to be ready..."
        
        # Wait for database to be ready
        MAX_RETRIES=30
        RETRY_COUNT=0
        
        while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
            if podman exec "$CONTAINER_NAME" pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" &> /dev/null; then
                echo -e "${GREEN}✅ PostgreSQL is ready!${NC}"
                break
            fi
            
            echo -n "."
            sleep 1
            RETRY_COUNT=$((RETRY_COUNT + 1))
        done
        
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo -e "${RED}❌ PostgreSQL failed to start${NC}"
            exit 1
        fi
        
        echo ""
        echo -e "${CYAN}Next steps:${NC}"
        echo "1. Run migrations: npm run db:migrate"
        echo "2. Start the app: npm run dev"
        echo ""
        echo "Connection string: postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB"
        ;;
        
    stop)
        echo -e "${CYAN}Stopping PostgreSQL container...${NC}"
        
        if container_running; then
            podman stop "$CONTAINER_NAME"
            echo -e "${GREEN}✅ Container stopped${NC}"
        else
            echo -e "${YELLOW}⚠️  Container is not running${NC}"
        fi
        ;;
        
    restart)
        echo -e "${CYAN}Restarting PostgreSQL container...${NC}"
        
        if container_exists; then
            podman restart "$CONTAINER_NAME"
            echo -e "${GREEN}✅ Container restarted${NC}"
        else
            echo -e "${RED}❌ Container does not exist${NC}"
            echo "Run './podman-postgres.sh start' to create it"
            exit 1
        fi
        ;;
        
    remove)
        echo -e "${YELLOW}⚠️  Removing PostgreSQL container...${NC}"
        echo "This will stop and remove the container (data will be preserved in volume)"
        read -p "Are you sure? (y/N) " -n 1 -r
        echo
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if container_exists; then
                if container_running; then
                    podman stop "$CONTAINER_NAME"
                fi
                podman rm "$CONTAINER_NAME"
                echo -e "${GREEN}✅ Container removed${NC}"
                echo "Volume '$DATA_VOLUME' still exists (data preserved)"
            else
                echo -e "${YELLOW}⚠️  Container does not exist${NC}"
            fi
        else
            echo "Cancelled"
        fi
        ;;
        
    clean)
        echo -e "${RED}⚠️  WARNING: This will remove ALL data!${NC}"
        echo "This will remove the container AND the data volume"
        read -p "Are you sure? Type 'yes' to confirm: " -r
        echo
        
        if [[ $REPLY == "yes" ]]; then
            if container_running; then
                podman stop "$CONTAINER_NAME"
            fi
            
            if container_exists; then
                podman rm "$CONTAINER_NAME"
            fi
            
            if podman volume exists "$DATA_VOLUME" 2>/dev/null; then
                podman volume rm "$DATA_VOLUME"
                echo -e "${GREEN}✅ Container and volume removed${NC}"
            else
                echo -e "${YELLOW}⚠️  Volume does not exist${NC}"
            fi
        else
            echo "Cancelled"
        fi
        ;;
        
    logs)
        if container_exists; then
            podman logs -f "$CONTAINER_NAME"
        else
            echo -e "${RED}❌ Container does not exist${NC}"
            exit 1
        fi
        ;;
        
    psql)
        if container_running; then
            podman exec -it "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
        else
            echo -e "${RED}❌ Container is not running${NC}"
            echo "Start it with: ./podman-postgres.sh start"
            exit 1
        fi
        ;;
        
    status)
        echo -e "${CYAN}PostgreSQL Container Status${NC}"
        echo "============================"
        echo ""
        
        if container_running; then
            echo -e "Status: ${GREEN}RUNNING ✅${NC}"
            echo ""
            
            # Get container info
            echo "Container: $CONTAINER_NAME"
            echo "Image: postgres:$POSTGRES_VERSION"
            echo "Database: $POSTGRES_DB"
            echo "User: $POSTGRES_USER"
            echo "Port: $POSTGRES_PORT"
            echo "Volume: $DATA_VOLUME"
            
            # Check health
            HEALTH=$(podman inspect "$CONTAINER_NAME" --format '{{.State.Health.Status}}' 2>/dev/null || echo "unknown")
            echo "Health: $HEALTH"
            
            echo ""
            echo "Connection string:"
            echo "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB"
        elif container_exists; then
            echo -e "Status: ${YELLOW}STOPPED ⏸${NC}"
            echo ""
            echo "Start it with: ./podman-postgres.sh start"
        else
            echo -e "Status: ${RED}NOT CREATED ❌${NC}"
            echo ""
            echo "Create it with: ./podman-postgres.sh start"
        fi
        ;;
        
    *)
        echo "Usage: $0 {start|stop|restart|remove|clean|logs|psql|status}"
        echo ""
        echo "Commands:"
        echo "  start   - Start PostgreSQL container (creates if doesn't exist)"
        echo "  stop    - Stop the container"
        echo "  restart - Restart the container"
        echo "  remove  - Remove the container (keeps data)"
        echo "  clean   - Remove container AND data (WARNING: destructive)"
        echo "  logs    - Show container logs"
        echo "  psql    - Open PostgreSQL shell"
        echo "  status  - Show container status"
        exit 1
        ;;
esac
