## devops_pipelines

Practice project for DevOps + basic backend: Todo + Auth (JWT) API with Express + Prisma + PostgreSQL. Use this repo to experiment with CI/CD pipelines, Docker Compose, testing, lint/format, etc.

### Architecture & stack
- Node.js + Express, TypeScript
- Prisma ORM (PostgreSQL)
- Zod for input validation
- Docker Compose for PostgreSQL

### Prerequisites
- Node.js >= 20
- Docker & Docker Compose (if you want the DB via container)
- Create a `.env` file in the project root:
  ```
  DATABASE_URL="postgresql://admin:admin123@localhost:5432/my_app"
  JWT_SECRET="your-secret"
  ```

### Run locally
1) Start PostgreSQL via Docker:
   ```bash
   docker compose up -d
   ```
2) Install dependencies:
   ```bash
   npm install
   ```
3) Apply migrations (already in `prisma/migrations`):
   ```bash
   npx prisma migrate deploy --config ./prisma.config.ts
   ```
   (or `npx prisma db push` for quick dev sync)
4) Start the server:
   ```bash
   npm run dev
   ```
   Default server: `http://localhost:3000`.

### Todo API
- `POST /api/v1/todos` — create todo (body: `userId`, `title`, `description?`, `priority?`, `status?`)
- `GET /api/v1/todos?userId=1&status=PENDING&priority=HIGH` — list todos with filters
- `GET /api/v1/todos/:id` — get detail
- `PUT /api/v1/todos/:id` — update (title/description/status/priority)
- `DELETE /api/v1/todos/:id` — delete

### Auth (quick ref)
- `POST /api/v1/auth/register` — register
- `POST /api/v1/auth/login` — login, returns accessToken (JWT)

### Lint/format
```bash
npm run lint
npm run format
```

### DevOps practice ideas
- CI pipeline: lint + test + build
- Add app Dockerfile; use Compose for app + db
- Add DB migration step on deploy
- Add healthcheck and simple monitoring

