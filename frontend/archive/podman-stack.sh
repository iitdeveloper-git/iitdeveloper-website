#!/bin/bash

# IITDeveloper - Podman Container Management
# Orchestrate all services (frontend + postgres)

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_NAME="iitdeveloper"
COMPOSE_FILE="docker-compose.yml"

# Functions
print_header() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                        ║${NC}"
    echo -e "${CYAN}║           🐳 IITDeveloper Container Manager           ║${NC}"
    echo -e "${CYAN}║                                                        ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_status() {
    echo -e "${BLUE}➜${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

check_podman() {
    if ! command -v podman &> /dev/null; then
        print_error "Podman is not installed"
        echo "Install with: brew install podman"
        exit 1
    fi
    print_success "Podman is installed"
}

check_compose() {
    if ! command -v podman-compose &> /dev/null; then
        print_warning "podman-compose not found, using podman-compose alternative"
        # Podman 4.0+ has built-in compose support
        if ! podman compose version &> /dev/null; then
            print_error "Neither podman-compose nor podman compose is available"
            echo "Install with: pip3 install podman-compose"
            exit 1
        fi
        COMPOSE_CMD="podman compose"
    else
        COMPOSE_CMD="podman-compose"
    fi
}

# Command handlers
cmd_build() {
    print_header
    check_podman
    check_compose
    
    print_status "Building containers..."
    $COMPOSE_CMD -f $COMPOSE_FILE build --no-cache
    
    print_success "Build complete!"
}

cmd_up() {
    print_header
    check_podman
    check_compose
    
    print_status "Starting services..."
    $COMPOSE_CMD -f $COMPOSE_FILE up -d
    
    echo ""
    print_success "Services started!"
    echo ""
    echo "Services:"
    echo "  Frontend: http://localhost:3000"
    echo "  Database: localhost:5432"
    echo ""
    echo "Commands:"
    echo "  ./podman-stack.sh logs     - View logs"
    echo "  ./podman-stack.sh status   - Check status"
    echo "  ./podman-stack.sh down     - Stop services"
}

cmd_down() {
    print_header
    check_podman
    check_compose
    
    print_status "Stopping services..."
    $COMPOSE_CMD -f $COMPOSE_FILE down
    
    print_success "Services stopped"
}

cmd_restart() {
    print_header
    check_podman
    check_compose
    
    print_status "Restarting services..."
    $COMPOSE_CMD -f $COMPOSE_FILE restart
    
    print_success "Services restarted"
}

cmd_logs() {
    check_podman
    check_compose
    
    SERVICE=${2:-}
    
    if [ -z "$SERVICE" ]; then
        $COMPOSE_CMD -f $COMPOSE_FILE logs -f
    else
        $COMPOSE_CMD -f $COMPOSE_FILE logs -f $SERVICE
    fi
}

cmd_status() {
    print_header
    check_podman
    check_compose
    
    print_status "Container Status"
    echo ""
    $COMPOSE_CMD -f $COMPOSE_FILE ps
    
    echo ""
    print_status "Health Status"
    echo ""
    
    # Check frontend
    if podman ps --filter "name=iitdeveloper-frontend" --format "{{.Status}}" | grep -q "Up"; then
        FRONTEND_HEALTH=$(podman inspect iitdeveloper-frontend --format '{{.State.Health.Status}}' 2>/dev/null || echo "no healthcheck")
        print_success "Frontend: Running ($FRONTEND_HEALTH)"
    else
        print_error "Frontend: Not running"
    fi
    
    # Check postgres
    if podman ps --filter "name=iitdeveloper-postgres" --format "{{.Status}}" | grep -q "Up"; then
        POSTGRES_HEALTH=$(podman inspect iitdeveloper-postgres --format '{{.State.Health.Status}}' 2>/dev/null || echo "no healthcheck")
        print_success "PostgreSQL: Running ($POSTGRES_HEALTH)"
    else
        print_error "PostgreSQL: Not running"
    fi
    
    echo ""
}

cmd_shell() {
    check_podman
    
    SERVICE=${2:-frontend}
    
    print_status "Opening shell in $SERVICE..."
    
    if [ "$SERVICE" = "frontend" ]; then
        podman exec -it iitdeveloper-frontend /bin/sh
    elif [ "$SERVICE" = "postgres" ]; then
        podman exec -it iitdeveloper-postgres psql -U postgres -d iitdeveloper
    else
        print_error "Unknown service: $SERVICE"
        echo "Available services: frontend, postgres"
        exit 1
    fi
}

cmd_clean() {
    print_header
    check_podman
    check_compose
    
    print_warning "This will remove all containers, networks, and volumes!"
    read -p "Are you sure? (type 'yes' to confirm): " -r
    echo
    
    if [[ $REPLY == "yes" ]]; then
        print_status "Stopping and removing containers..."
        $COMPOSE_CMD -f $COMPOSE_FILE down -v
        
        print_status "Removing images..."
        podman rmi iitdeveloper-frontend 2>/dev/null || true
        
        print_success "Cleanup complete"
    else
        print_warning "Cancelled"
    fi
}

cmd_dev() {
    print_header
    check_podman
    check_compose
    
    print_status "Starting in development mode..."
    $COMPOSE_CMD -f $COMPOSE_FILE up
}

cmd_migrate() {
    print_header
    check_podman
    
    print_status "Running database migrations..."
    
    # Check if postgres container is running
    if ! podman ps --filter "name=iitdeveloper-postgres" --format "{{.Status}}" | grep -q "Up"; then
        print_error "PostgreSQL container is not running"
        echo "Start it with: ./podman-stack.sh up"
        exit 1
    fi
    
    # Run migrations
    print_status "Applying schema..."
    podman exec -i iitdeveloper-postgres psql -U postgres -d iitdeveloper < src/lib/db/schema.sql
    
    # Run migration files if they exist
    if [ -d "src/lib/db/migrations" ]; then
        print_status "Applying migrations..."
        for migration in $(ls src/lib/db/migrations/*.sql 2>/dev/null | sort -V); do
            if [ -f "$migration" ]; then
                migration_name=$(basename "$migration")
                print_status "Running $migration_name"
                podman exec -i iitdeveloper-postgres psql -U postgres -d iitdeveloper < "$migration"
            fi
        done
    fi
    
    print_success "Migrations complete"
}

cmd_stats() {
    check_podman
    
    print_header
    print_status "Container Resource Usage"
    echo ""
    
    podman stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

cmd_help() {
    print_header
    
    cat << EOF
${CYAN}Usage:${NC} $0 <command> [options]

${CYAN}Commands:${NC}

  ${GREEN}Development:${NC}
    dev              Start services in foreground (with logs)
    build            Build all container images
    up               Start all services in background
    down             Stop all services
    restart          Restart all services

  ${GREEN}Monitoring:${NC}
    status           Show container status
    logs [service]   Show logs (all or specific service)
    stats            Show resource usage
    shell <service>  Open shell in container (frontend/postgres)

  ${GREEN}Database:${NC}
    migrate          Run database migrations

  ${GREEN}Maintenance:${NC}
    clean            Remove all containers, networks, and volumes

  ${GREEN}Help:${NC}
    help             Show this help message

${CYAN}Examples:${NC}

  # Start everything
  $0 up

  # View logs
  $0 logs
  $0 logs frontend

  # Open database shell
  $0 shell postgres

  # Rebuild and restart
  $0 build && $0 restart

${CYAN}Services:${NC}
  • Frontend (Next.js): http://localhost:3000
  • PostgreSQL Database: localhost:5432

EOF
}

# Main command router
COMMAND=${1:-help}

case "$COMMAND" in
    build)
        cmd_build
        ;;
    up)
        cmd_up
        ;;
    down)
        cmd_down
        ;;
    restart)
        cmd_restart
        ;;
    logs)
        cmd_logs "$@"
        ;;
    status)
        cmd_status
        ;;
    shell)
        cmd_shell "$@"
        ;;
    clean)
        cmd_clean
        ;;
    dev)
        cmd_dev
        ;;
    migrate)
        cmd_migrate
        ;;
    stats)
        cmd_stats
        ;;
    help|--help|-h)
        cmd_help
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        echo ""
        cmd_help
        exit 1
        ;;
esac
