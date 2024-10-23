
COMPOSE_FILE = docker-compose.yml

SERVICES = db nextjs

.PHONY: all start stop clean

all: start

start:
	@echo "Starting all services..."
	docker-compose -f $(COMPOSE_FILE) up -d $(SERVICES)

stop:
	@echo "Stopping all services..."
	docker-compose -f $(COMPOSE_FILE) down

clean: stop
	@echo "Removing all containers and images..."
	docker-compose -f $(COMPOSE_FILE) down --rmi all -v
