.PHONY: help build up down test lint migrate schedule-event analyze-impact

help:
	@echo "Service Continuity Calendar - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "schedule-event     : Trigger event scheduling engine"
	@echo "analyze-impact     : Run service impact analysis"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

schedule-event:
	docker-compose exec api python scripts/schedule/run.py

analyze-impact:
	docker-compose exec api python scripts/analyze/impact.py
