include .env

## ----- Make Environment -----
COMPOSE_CONFIG= -p $(PROJECT_NAME) -f docker-compose.$(MODE).yml

## -------- Actions -----------
up: ## Start all containers
	docker compose $(COMPOSE_CONFIG) up -d --build

down: ## Stop all containers
	docker compose $(COMPOSE_CONFIG) down

restart: ## Restart all containers
	docker compose $(COMPOSE_CONFIG) restart

help: ## Show help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
