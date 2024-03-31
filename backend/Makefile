up: 
	docker compose -f ./docker-compose.yml -p smm-service up

upb:
	docker compose -f ./docker-compose.yml -p smm-service up --build

upd:
	docker compose -f ./docker-compose.yml -p smm-service up -d

start:
	docker compose -f ./docker-compose.yml -p smm-service start

down:
	docker compose -f ./docker-compose.yml -p smm-service down -t 0

kill: down
	docker volume rm smm-service_rabbitmq-data smm-service_minio-data smm-service_postgres-data

format:
	python3 -m ruff format .

lint:
	python3 -m ruff lint .

fix:
	python3 -m ruff lint . --fix
