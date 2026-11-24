# Sprint 3 — Vinaybad's database work and verification (#62, #66)

**Assigned account:** `vinaybadavath123`. **Scope:** root StockWise
`db/schema.sql` + `db/seed.sql` (3 suppliers, 8 products, 7 movements).
This differs from the independent `prototypes/local-tested-sprint3/` demo
(4 suppliers, 12 products, 17 movements): never mix the two datasets.

## Deliverables

- `db/verify.sql`: read-only audit of row counts, supplier/product joins,
  low-stock states, stock ledger reconciliation, orphan links, and constraints.
- `tests/db-integrity.test.js`: live MySQL 8.4 integration assertions,
  including rejection of duplicate SKUs, negative prices, invalid supplier or
  product references, zero-quantity movements, and restricted deletions.
  The negative tests run inside a transaction and roll it back.
- `scripts/load-demo-db.js`: explicitly gated **demo-only** schema/seed importer
  for local/CI use. The action imports twice to check seeded IDs are idempotent.
- `.github/workflows/sprint3-db-integrity.yml`: temporary MySQL 8.4 service
  and automated tests on the database pull request.

The existing schema and seed were **already present on `main`** before this
branch was created; they are not claimed as original Vinaybad commits.
This branch adds test and verification evidence with ChatGPT assistance
through Vinaybad's connected account; assigned-member understanding/review,
CI execution, and merge approval still need to be recorded truthfully.

## Expected results on a clean root demo database

| Metric | Expected |
|---|---:|
| Suppliers | 3 |
| Products | 8 |
| Movements | 7 |
| Low stock, `stock_quantity <= reorder_level` | 4 |
| Total units | 101 |
| Supplier product counts (IDs 1, 2, 3) | 3, 3, 2 |
| Ledger/product balance mismatches | 0 |
| Orphan supplier/product foreign key links | 0 |
| Duplicate SKU/negative price/zero quantity attempts | Rejected |
| Invalid foreign keys | Rejected |
| Delete linked supplier or product | Rejected |

## Run tests locally

Use an isolated local MySQL 8.4 instance with a **throwaway** `stockwise`
database. Do not run the importer against real data: the seed upserts reserved
demo IDs and resets their values. Provide local variables
`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME=stockwise`.
Never commit passwords or `.env`.

1. With the demo database prepared, set `STOCKWISE_DEMO_SETUP=1` and run
   `node scripts/load-demo-db.js` (requires database CREATE privileges).
2. Optional direct SQL review:
   `mysql -u root -p < db/verify.sql`.
3. Set `STOCKWISE_DB_TEST=1` and run `npm test`. Without that variable, the
   live MySQL test is marked **skipped**, not **passed**.
4. Check GitHub Actions on this PR for the actual database test result.
   An open pull request or green static checks alone do not prove these tests ran.

## Scope and limitations

This validates the **seeded read-only Sprint 3 state**. There is no stock
IN/OUT write API, no atomic movement posting, no oversell protection for
concurrent updates, and no claim that Sprint 4's full CRUD is implemented.
Changes should be reviewed and merged by the project's authorised members.

**Issue status:** Implementation submitted for review; do not close #62/#66 or
mark Done until the CI check and genuine team review/merge confirm acceptance.
