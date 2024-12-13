include .env

## ----- Make Environment -----
COMPOSE_CONFIG= -p $(PROJECT_NAME) -f docker-compose.$(NODE_ENV).yml

## -------- Actions -----------
up: ## Start all containers
	docker compose $(COMPOSE_CONFIG) up -d --build

down: ## Stop all containers
	docker compose $(COMPOSE_CONFIG) down

restart: ## Restart all containers
	docker compose $(COMPOSE_CONFIG) restart

NAME ?= new-migration
migration-generate: ## Generate a new migration (usage: make migration-generate NAME=your-migration-name)
	docker compose $(COMPOSE_CONFIG) run --rm server npm run migration:generate --name=$(NAME)

migration-create: ## Create a new empty migration (usage: make migration-create NAME=your-migration-name)
	docker compose $(COMPOSE_CONFIG) run --rm server npm run migration:create --name=$(NAME)

migration-run: ## Run all pending migrations
	docker compose $(COMPOSE_CONFIG) run --rm server npm run migration:run

migration-revert: ## Revert the last migration
	docker compose $(COMPOSE_CONFIG) run --rm server npm run migration:revert

init: up migration-run ## Make full application initialization

help: ## Show help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
