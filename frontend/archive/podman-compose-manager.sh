#!/bin/bash

# IITDeveloper - Podman Compose Environment Manager
# Manage multi-environment deployments with podman-compose

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Configuration
COMPOSE_FILE="podman-compose.yml"
DEFAULT_ENV="development"

# Functions
print_header() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                        ║${NC}"
    echo -e "${CYAN}║      🐳 IITDeveloper Compose Environment Manager      ║${NC}"
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

check_podman_compose() {
    if command -v podman-compose &> /dev/null; then
        COMPOSE_CMD="podman-compose"
    elif podman compose version &> /dev/null 2>&1; then
        COMPOSE_CMD="podman compose"
    else
        print_error "Neither podman-compose nor podman compose is available"
        echo "Install with: pip3 install podman-compose"
        exit 1
    fi
}

get_env_file() {
    local env=$1
    case "$env" in
        dev|development)
            echo ".env.development"
            ;;
        staging|stage)
            echo ".env.staging"
            ;;
        prod|production)
            echo ".env.prod"
            ;;
        *)
            echo ".env.$env"
            ;;
    esac
}

validate_env_file() {
    local env_file=$1
    
    if [ ! -f "$env_file" ]; then
        print_error "Environment file not found: $env_file"
        echo ""
        echo "Available environments:"
        ls -1 .env.* 2>/dev/null | sed 's/.env./  - /'
        exit 1
    fi
    
    # Check for placeholder passwords
    if grep -q "CHANGE_ME" "$env_file"; then
        print_warning "Environment file contains CHANGE_ME placeholders"
        print_warning "Update passwords before deploying to production!"
        echo ""
    fi
}

# Command handlers
cmd_up() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Starting services in $env environment..."
    echo ""
    
    validate_env_file "$env_file"
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE up -d
    
    echo ""
    print_success "Services started!"
    echo ""
    cmd_status "$@"
}

cmd_down() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Stopping services..."
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE down
    
    print_success "Services stopped"
}

cmd_build() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Building images for $env environment..."
    
    validate_env_file "$env_file"
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE build --no-cache
    
    print_success "Build complete!"
}

cmd_restart() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Restarting services..."
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE restart
    
    print_success "Services restarted"
}

cmd_logs() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    local service=${3:-}
    
    check_podman_compose
    
    if [ -z "$service" ]; then
        $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE logs -f
    else
        $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE logs -f "$service"
    fi
}

cmd_status() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_status "Environment: ${MAGENTA}$env${NC}"
    print_status "Config: $env_file"
    echo ""
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE ps
    echo ""
}

cmd_shell() {
    local env=${2:-$DEFAULT_ENV}
    local service=${3:-frontend}
    local env_file=$(get_env_file "$env")
    
    print_status "Opening shell in $service..."
    
    check_podman_compose
    
    if [ "$service" = "postgres" ]; then
        $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE exec postgres psql -U postgres -d iitdeveloper
    else
        $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE exec "$service" /bin/sh
    fi
}

cmd_migrate() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Running database migrations for $env..."
    
    check_podman_compose
    
    # Run schema
    print_status "Applying schema..."
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE exec -T postgres psql -U postgres -d iitdeveloper < src/lib/db/schema.sql
    
    # Run migrations
    if [ -d "src/lib/db/migrations" ]; then
        print_status "Applying migrations..."
        for migration in $(ls src/lib/db/migrations/*.sql 2>/dev/null | sort -V); do
            if [ -f "$migration" ]; then
                migration_name=$(basename "$migration")
                print_status "Running $migration_name"
                $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE exec -T postgres psql -U postgres -d iitdeveloper < "$migration"
            fi
        done
    fi
    
    print_success "Migrations complete"
}

cmd_clean() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_warning "This will remove all containers, networks, and volumes!"
    read -p "Are you sure? (type 'yes' to confirm): " -r
    echo
    
    if [[ $REPLY == "yes" ]]; then
        check_podman_compose
        $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE down -v
        
        print_success "Cleanup complete"
    else
        print_warning "Cancelled"
    fi
}

cmd_config() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Validating compose configuration for $env..."
    echo ""
    
    validate_env_file "$env_file"
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE config
}

cmd_pull() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Pulling latest images..."
    
    check_podman_compose
    $COMPOSE_CMD --env-file "$env_file" -f $COMPOSE_FILE pull
    
    print_success "Images updated"
}

cmd_env_list() {
    print_header
    print_status "Available environments:"
    echo ""
    
    for env_file in .env.*; do
        if [ -f "$env_file" ]; then
            env_name=$(basename "$env_file" | sed 's/.env.//')
            
            # Read environment name from file
            env_type=$(grep "^ENVIRONMENT=" "$env_file" | cut -d'=' -f2)
            
            if [ -n "$env_type" ]; then
                echo -e "  ${GREEN}$env_name${NC} → $env_type"
            else
                echo -e "  ${YELLOW}$env_name${NC}"
            fi
        fi
    done
    echo ""
}

cmd_env_copy() {
    local from_env=${2:-}
    local to_env=${3:-}
    
    if [ -z "$from_env" ] || [ -z "$to_env" ]; then
        print_error "Usage: $0 env-copy <from> <to>"
        exit 1
    fi
    
    local from_file=$(get_env_file "$from_env")
    local to_file=$(get_env_file "$to_env")
    
    if [ ! -f "$from_file" ]; then
        print_error "Source environment not found: $from_file"
        exit 1
    fi
    
    if [ -f "$to_file" ]; then
        print_warning "Target environment already exists: $to_file"
        read -p "Overwrite? (yes/no): " -r
        echo
        if [[ $REPLY != "yes" ]]; then
            print_warning "Cancelled"
            exit 0
        fi
    fi
    
    cp "$from_file" "$to_file"
    print_success "Copied $from_file → $to_file"
    print_warning "Remember to update passwords and settings!"
}

cmd_health() {
    local env=${2:-$DEFAULT_ENV}
    local env_file=$(get_env_file "$env")
    
    print_header
    print_status "Checking application health..."
    echo ""
    
    # Load port from env file
    FRONTEND_PORT=$(grep "^FRONTEND_PORT=" "$env_file" | cut -d'=' -f2)
    FRONTEND_PORT=${FRONTEND_PORT:-3000}
    
    # Check health endpoint
    if curl -s -f "http://localhost:$FRONTEND_PORT/api/health" > /dev/null; then
        print_success "Frontend: Healthy"
        curl -s "http://localhost:$FRONTEND_PORT/api/health" | jq . 2>/dev/null || true
    else
        print_error "Frontend: Unhealthy or not responding"
    fi
    echo ""
}

cmd_help() {
    print_header
    
    cat << EOF
${CYAN}Usage:${NC} $0 <command> [environment] [options]

${CYAN}Environments:${NC}
  dev, development     Development environment (default)
  staging, stage       Staging environment
  prod, production     Production environment

${CYAN}Commands:${NC}

  ${GREEN}Deployment:${NC}
    up [env]           Start services in specified environment
    down [env]         Stop services
    restart [env]      Restart services
    build [env]        Build images for environment

  ${GREEN}Monitoring:${NC}
    status [env]       Show container status
    logs [env] [svc]   Show logs (all or specific service)
    health [env]       Check application health
    shell [env] [svc]  Open shell in container

  ${GREEN}Database:${NC}
    migrate [env]      Run database migrations

  ${GREEN}Maintenance:${NC}
    clean [env]        Remove containers, networks, and volumes
    pull [env]         Pull latest images
    config [env]       Validate compose configuration

  ${GREEN}Environment Management:${NC}
    env-list           List available environments
    env-copy <from> <to>  Copy environment configuration

  ${GREEN}Help:${NC}
    help               Show this help message

${CYAN}Examples:${NC}

  # Start development environment
  $0 up dev

  # Start production environment
  $0 up prod

  # View production logs
  $0 logs prod

  # Run migrations in staging
  $0 migrate staging

  # Open database shell in production
  $0 shell prod postgres

  # Check health
  $0 health prod

  # Build staging images
  $0 build staging

${CYAN}Environment Files:${NC}
  .env.development    Development configuration
  .env.staging        Staging configuration
  .env.prod           Production configuration

EOF
}

# Main command router
COMMAND=${1:-help}

case "$COMMAND" in
    up|start)
        cmd_up "$@"
        ;;
    down|stop)
        cmd_down "$@"
        ;;
    build)
        cmd_build "$@"
        ;;
    restart)
        cmd_restart "$@"
        ;;
    logs)
        cmd_logs "$@"
        ;;
    status|ps)
        cmd_status "$@"
        ;;
    shell|exec)
        cmd_shell "$@"
        ;;
    migrate)
        cmd_migrate "$@"
        ;;
    clean)
        cmd_clean "$@"
        ;;
    config|validate)
        cmd_config "$@"
        ;;
    pull)
        cmd_pull "$@"
        ;;
    health|healthcheck)
        cmd_health "$@"
        ;;
    env-list|envs)
        cmd_env_list
        ;;
    env-copy)
        cmd_env_copy "$@"
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
