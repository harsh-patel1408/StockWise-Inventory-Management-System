# Sprint 3 backend verification — 24 November 2026

This AI-assisted verification covers the prototype in `prototypes/local-tested-sprint3/` for issues #61 and #65. The results below come from a fresh Linux run with Node.js 24.22.3 and MariaDB 11.8.9. The repository root has a separate prototype with different demo data.

## Setup and results

Install dependencies with `npm install` in `prototypes/local-tested-sprint3/`. Import `db/schema.sql` and `db/seed.sql` once into a fresh database, copy `.env.example` to `.env`, and use a database account with `SELECT` access for the application. Run `npm run check`, `npm test`, then `npm start`. Syntax checks and all five existing tests passed during this run.

| Request | HTTP | Observed result |
| --- | --- | --- |
| `/health` | 200 | `status` is `ok` |
| `/` | 200 | 12 products, 271 units, 5 low-stock alerts, £2,034.85 in inventory |
| `/products` | 200 | 12 products |
| `/products?low=1` | 200 | 5 low-stock products |
| `/products?search=STK-004&low=1` | 200 | USB-C Charging Cable, one result |
| `/products?search=blue%20ballpoint` | 200 | Blue Ballpoint Pens, one result |
| `/products?search=missing-demo-product` | 200 | No-results message |
| `/products/2` | 200 | Blue Ballpoint Pens, Northstar Wholesale, and the sample sale |
| `/suppliers` | 200 | 4 suppliers |
| `/movements` | 200 | 17 movement rows |
| `/products/9999`, `/products/invalid` | 404 | Product not found |
| `/unknown-route` | 404 | Page not found |
| `/`, `/products`, `/products/2`, `/suppliers`, `/movements` with MariaDB stopped | 500 | The configured database error page appeared for each request |
| `/health` with MariaDB stopped | 200 | The Express process remained available |

The route change forwards rejected asynchronous controller calls to the existing Express error middleware. The runtime checks covered both successful database requests and the failure path after stopping MariaDB.

## Review and handover for #69

- Issue #62 lists the smaller dataset used by the root prototype. For the prototype tested here, direct SQL returned 4 suppliers, 12 products, 17 movements and 5 low-stock products. Confirm which prototype the team will present before updating #62.
- For the ten-minute review, show the dashboard and search (2 min), desktop/mobile UI (2 min), supplier and movement data (2 min), then team PRs, blockers and Sprint 4 handover (4 min).
- Review the individual pull requests and issue evidence before updating the Scrum board. Team approval, individual contributions, and the Sprint 3 review meeting remain pending.
- Carry forward product and supplier CRUD, stock IN/OUT writes and transactional inventory updates to Sprint 4.
