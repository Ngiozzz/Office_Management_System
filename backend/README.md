# OMS Backend — Python / FastAPI

Backend API for the **Office Management System**.

## Roles
Super Admin · Director · General Manager · Line Manager · Staff

## Stack
| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | FastAPI                           |
| Database    | PostgreSQL + SQLAlchemy 2.0       |
| Migrations  | Alembic                           |
| Auth        | JWT (python-jose) + bcrypt        |
| Cache       | Redis                             |
| Validation  | Pydantic v2                       |
| Testing     | pytest + httpx                    |
| Container   | Docker + Docker Compose           |

## Quick Start

```bash
cp .env.example .env          # fill in your values
docker-compose up --build     # start api + postgres + redis
docker-compose exec api alembic upgrade head   # run migrations
```

API:      http://localhost:8000  
Swagger:  http://localhost:8000/docs
