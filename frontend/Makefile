# Makefile for IITDeveloper Container Management
# Provides convenient shortcuts for container operations

.PHONY: help build up down restart logs status shell clean migrate stats dev

# Colors
CYAN := \033[0;36m
GREEN := \033[0;32m
NC := \033[0m

help: ## Show this help message
	@echo ""
	@echo "$(CYAN)IITDeveloper Container Management$(NC)"
	@echo "=================================="
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

build: ## Build all container images
	@./podman-stack.sh build

up: ## Start all services in background
	@./podman-stack.sh up

down: ## Stop all services
	@./podman-stack.sh down

restart: ## Restart all services
	@./podman-stack.sh restart

logs: ## View logs for all services
	@./podman-stack.sh logs

logs-frontend: ## View frontend logs
	@./podman-stack.sh logs frontend

logs-postgres: ## View postgres logs
	@./podman-stack.sh logs postgres

status: ## Show container status
	@./podman-stack.sh status

shell-frontend: ## Open shell in frontend container
	@./podman-stack.sh shell frontend

shell-postgres: ## Open PostgreSQL shell
	@./podman-stack.sh shell postgres

clean: ## Remove all containers and volumes
	@./podman-stack.sh clean

migrate: ## Run database migrations
	@./podman-stack.sh migrate

stats: ## Show container resource usage
	@./podman-stack.sh stats

dev: ## Start services in foreground (with logs)
	@./podman-stack.sh dev

rebuild: down clean build up ## Rebuild everything from scratch

deploy: build up migrate ## Deploy fresh (build + start + migrate)

health: ## Check application health
	@curl -s http://localhost:3000/api/health | jq .

backup-db: ## Backup database
	@echo "Creating database backup..."
	@podman exec iitdeveloper-postgres pg_dump -U postgres iitdeveloper > backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created: backup_$$(date +%Y%m%d_%H%M%S).sql$(NC)"

install-deps: ## Install project dependencies
	@npm install --legacy-peer-deps

test: ## Run tests
	@npm run test:api

lint: ## Run linter
	@npm run lint

type-check: ## Run TypeScript type checking
	@npm run type-check
