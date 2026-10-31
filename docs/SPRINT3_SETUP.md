# Sprint 3 — Working Prototype (in progress)

**Assessment:** Software Development 2 (CMP-L004-0), Sprint 3, deadline **25 November 2026 at 2:00 PM**. This repository contains an initial implementation of the required Pug + Node.js/Express + MySQL read-only prototype. Code upload does **not** prove successful execution or peer approval.

## Features currently implemented in source

- Responsive Pug dashboard with total products, units, low-stock alerts, value and recent movements.
- MySQL-backed products list with search and low-stock filter.
- MySQL-backed product detail and dated stock-movement history.
- MySQL-backed supplier directory with product counts.
- MySQL schema, foreign keys, checks and eight illustrative products, three suppliers and seven opening stock movements.
- Database error handling and a 404 page. No login, write actions or live deployment yet.

## Quick start: Docker Compose (recommended for local demonstration)

1. Install Docker Desktop and enable the Docker engine.
2. From the repository root run `docker compose up --build`.
3. Wait for MySQL's health check, then visit **http://localhost:3000**.
4. Inspect pages: `/`, `/products`, `/products?low=1`, `/products/2`, `/suppliers`, `/movements`.
5. Verify the sample data: **8 products**, **3 suppliers**, **7 movements**, **4 low-stock products** (IDs 2, 4, 5, 8). The sample is illustrative, not production data.
6. To stop: `docker compose down`. To **erase demo data and re-seed**: `docker compose down -v` then `docker compose up --build`. **Warning:** `down -v` deletes the local database volume.

**Security note:** Credentials in `compose.yaml` are explicitly demo-only and must not be reused in production or on a public server.

## Alternative: Node.js + local MySQL

1. Install Node.js 20+ and MySQL 8.4.
2. Create a MySQL user and database with suitable privileges, or use a local administrative account. Import `db/schema.sql` then `db/seed.sql` using MySQL Workbench or the CLI.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and enter your own local MySQL connection values.
5. Run `npm start`, then visit **http://localhost:3000**.
6. Keep `.env` private. Do not commit passwords.

## Manual smoke-test checklist (must be executed by team)

- [ ] Docker or local Node/MySQL starts without errors.
- [ ] Dashboard shows 8 products, 101 total units, 4 low-stock products, and an inventory value computed from seeded prices.
- [ ] Products search for `SW-1002` returns Blue Ballpoint Pens.
- [ ] Low-stock filter returns four products.
- [ ] Product detail at `/products/2` displays supplier and IN movement.
- [ ] Supplier directory displays three suppliers with linked counts.
- [ ] Movements page shows seven opening IN movements.
- [ ] Invalid product ID returns 404; unavailable MySQL produces a helpful 503.
- [ ] Capture dated screenshots and GitHub commit evidence for Sprint 3 review.
- [ ] Team members run/review code and submit **their own** commits; do not attribute these initial AI-assisted commits to other members.

## Sprint 3 traceability

| Feature | Stories |
|---|---|
| Dashboard & low stock | US-01, US-03 |
| Product search and details | US-02, US-04 |
| Supplier directory | US-09, US-13 |
| Movement history and balance | US-18, US-19 |
| Master data and movement write actions | Deferred to Sprint 4 |

## Important limitations

The current prototype is **read-only** and its SQL schema is seeded with demo data. Write operations, authentication, transaction handling for concurrent stock-out, full CRUD, automated integration tests, and production deployment are not implemented. Docker Compose is a convenience for local review, not evidence that Sprint 4 has been completed.

## AI declaration

Initial scaffold, SQL, routes, Pug templates and CSS were generated with ChatGPT assistance on 31 October 2026. The team must understand, test, improve and document its own work, including individual contributions, consistent with the university's AI guidance.
