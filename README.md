# Hello Node + PostgreSQL

A minimal Node API connected to PostgreSQL and runnable with Docker Compose.

## Run

```sh
docker compose up --build
curl http://localhost:3000/
```

The API returns a hello-world message and the current database time. Both `/`
and `/health` verify the PostgreSQL connection.

The Compose credentials are intentionally simple and are for local/demo use
only. Change them before adapting this project for any deployed environment.
