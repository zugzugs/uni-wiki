## Universal Games Wiki (Multi-tenant)

Ultra-advanced, graphic, multi-tenant wiki system for games. Built with Next.js 14, Prisma, and Postgres.

### Quick Start

1. Copy envs

```bash
cp .env.example .env
cp .env.example apps/web/.env.local
cp .env.example packages/db/.env
```

2. Start services

```bash
docker compose up -d
```

3. Install deps and set up DB

```bash
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
```

4. Run the web app

```bash
npm run dev
```

Open http://localhost:3000 and explore the demo tenant.

### Multi-tenancy
- Map domains to tenants via `TENANT_DOMAIN_MAP` (JSON) in environment.
- Requests are rewritten to `/{tenant}/...` transparently.

### Packages
- `packages/db`: Prisma schema and client
- `apps/web`: Next.js 14 app with app router
