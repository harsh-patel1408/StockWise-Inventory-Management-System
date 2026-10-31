# Sprint 3 — Local prototype verification (31 October 2026)

## Scope and provenance

This document records **user-performed local tests** of the separate `StockWise_Sprint3_Prototype` starter package. It does **not** claim that the exact same source files were pushed to this repository: the repository's root Sprint 3 scaffold has a different structure and sample dataset. Screenshots were supplied in the project conversation. Results are observations from those screenshots, not a remote deployment test.

## Environment

- Windows / VS Code; Node.js **v24.15.0**, npm **11.12.1**.
- Local MariaDB **10.4.32** through MySQL Workbench at `localhost:3306`.
- Application started with `npm start` and viewed at `http://localhost:3000`.
- Database name: `stockwise`. Credentials are intentionally omitted.
- Dependency installation: **119 packages audited, 0 vulnerabilities reported** in the correct local project directory.

## Tests supported by screenshots and terminal output

| Test | Evidence observed | Result |
|---|---|---|
| Database schema import | `suppliers`, `products`, `stock_movements` tables created with green SQL actions | Pass |
| Sample seed import | 4 suppliers, 12 products, 17 stock movements inserted with zero warnings | Pass |
| Query verification | SELECT COUNT queries executed; movements result shows 17 | Pass |
| Automated source checks | `npm test` reported 5 tests, 5 passed, 0 failed | Pass |
| Dashboard page | 12 products, 271 units, 5 low-stock alerts, £2,034.85 inventory value | Pass |
| Products list | `/products` rendered 12 records, SKU, supplier, stock, reorder, price, status | Pass |
| Supplier directory | `/suppliers` rendered 4 suppliers, contacts and linked-product counts | Pass |
| Stock movement history | `/movements` rendered dated IN/OUT rows and quantities | Pass |
| Search interaction | Search field visible; no screenshot of submitted search result | Not yet verified |
| Low-stock filter interaction | Checkbox visible; no screenshot of filter result | Not yet verified |
| Product details and 404 handling | Not demonstrated in supplied screenshots | Not yet verified |
| Write operations / authentication | Not part of this read-only local prototype | Not implemented |

## Distinction from repository root scaffold

The root repository's `docs/SPRINT3_SETUP.md` currently describes a different demo dataset (**8 products, 3 suppliers, 7 movements**). The locally verified package has **12 products, 4 suppliers, 17 movements**. Do not present local screenshots as direct proof that the GitHub root scaffold was run unchanged.

## Remaining work before Sprint 3 completion

1. Upload or merge the locally tested source with clear provenance, without overwriting unrelated repository work.
2. Reconcile the root README and setup guide with the chosen final codebase.
3. Verify search, low-stock filtering, product details, invalid IDs and error handling.
4. Capture evidence of the chosen GitHub version running against its matching database.
5. Update the task board based on real progress and obtain original team members' genuine contributions/reviews.
6. Prepare the Sprint 3 report and final demonstration evidence.

## Security and academic integrity

Never commit `.env`, local passwords, `node_modules/` or private database credentials. The screenshot-based results above were provided by the user; no additional team contributions or remote tests are claimed.
