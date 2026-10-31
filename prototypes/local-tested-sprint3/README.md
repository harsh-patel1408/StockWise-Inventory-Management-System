# StockWise — Sprint 3 working prototype

**Module:** Software Development 2 (CMP-L004-0) · **Sprint 3 deadline:** 25 November 2026 at 2:00 PM.

This is an **initial read-only working prototype** based on the StockWise Sprint 2 requirements and design. Stack: **Node.js + Express.js + Pug + MySQL 8**. The repository previously contained Sprint 2 planning documents; this package introduces the application source code.

## Features implemented in source
- Responsive Pug-rendered dashboard with **live database totals** (products, units, inventory value, low stock).
- Products list with name/SKU search and low-stock filter; supplier relationship.
- Product details with supplier contact and dated movement history.
- Suppliers directory with count of linked products.
- Recent stock IN/OUT movement history.
- MySQL relational schema and **12 seeded products**, 4 suppliers, 17 movement rows.
- Parameterised SQL queries, read-only routes, and simple input validation.
- Basic unit tests for search normalisation and product ID validation.

**Not yet implemented:** create/update/delete UI, stock transaction writes, authentication, Docker Compose, team sign-off. These are planned future work. Do not claim they are complete. No MySQL integration test has been run in this environment.

## Setup (Windows / macOS / Linux)
1. Install **Node.js 20+** and **MySQL 8+**.
2. From a terminal in this folder, run `npm install`.
3. Load the database using a MySQL client: run `db/schema.sql`, then `db/seed.sql` **once on a fresh database**. In MySQL CLI: `mysql -u root -p < db/schema.sql` and `mysql -u root -p stockwise < db/seed.sql`.
4. Create a restricted MySQL user (replace the password):
   ```sql
   CREATE USER IF NOT EXISTS 'stockwise_app'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
   GRANT SELECT ON stockwise.* TO 'stockwise_app'@'localhost';
   ```
   If using `127.0.0.1`, MySQL account host matching may require a corresponding `stockwise_app`@`127.0.0.1` account; configure according to your environment. For the read-only Sprint 3 prototype, SELECT privileges suffice.
5. Copy `.env.example` to `.env` and set the correct MySQL credentials. **Never commit `.env`.**
6. Run `npm start` and visit **http://localhost:3000**.
7. Test `npm test` and verify `/health` returns JSON.

## Screens to capture as genuine Sprint 3 evidence
- MySQL tables and populated rows in MySQL Workbench.
- Dashboard showing actual MySQL totals.
- Products page with search and low-stock filter.
- Suppliers and movement history pages.
- Terminal running `npm start` and test output.
- GitHub commit history showing actual contributions by each team member.
- GitHub Project Board with accurately updated story status.

## Suggested team allocation (confirm with team)
- Harsh: Express routing, integration and code review.
- Kunjan: visual design, accessibility and UI review.
- Aavash: Pug pages, layout and responsive CSS.
- Vinaybad: schema, seed, SQL checks and tests.

**AI disclosure:** This initial scaffold was drafted with ChatGPT assistance and requires review, testing and meaningful implementation by the named team members. A single AI-assisted upload does **not** count as evidence of contributions by all four people.

**Related documentation:** `docs/SPRINT3_PROGRESS_CHECKLIST.md`.
