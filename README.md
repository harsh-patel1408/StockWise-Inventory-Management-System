# StockWise — Inventory Management System

Software Development 2 (CMP-L004-0) | University of Roehampton

## Project goal
Plan and build a single-store retail inventory application for tracking products, suppliers, stock movements and low-stock alerts.

## Original Sprint 1 team
| Member | GitHub | Primary role |
|---|---|---|
| Harsh Patel | @harsh-patel1408 | Backend, repository coordination |
| Kunjan | @kunjan130 | UI/UX, wireframes, user flows |
| Aavash | @aavashtuladharku-git | Frontend, Pug and CSS |
| Vinaybad | @vinaybadavath123 | MySQL database, validation and testing |

## Planned technology
Node.js, Express, Pug, CSS, MySQL and Docker (proposed in Sprint 1; implementation not claimed).

## Sprint 2 — Requirements and design
- 23 user stories with acceptance criteria: GitHub issues tagged `[Sprint 2][US-XX]`
- 14 design/planning tasks: GitHub issues tagged `[Sprint 2][S2-XX]`
- Planned deliverables: personas, use-case model, wireframes, user flows, traceability, peer review and demonstration.
- Issue status is initially **Backlog** until the team provides actual review/completion evidence.
- Priority and ownership appear in each issue; work must be reviewed by the original team.

## Key business rules
- Product SKU must be unique.
- New products start with zero stock; opening stock is recorded as an IN movement.
- Stock-in and stock-out quantities must be positive whole numbers.
- Stock-out must not exceed available quantity.
- Product balance and movement ledger update atomically.
- Low stock is `quantity_on_hand <= reorder_level`.
- Supplier deletion is blocked while linked products exist.

## Sprint 2 review
Use GitHub Issues and the team's Project board to demonstrate requirements, priorities, owners and truthful progress. Attach or link the editable design pack and review evidence.

> This repository README documents the **planned** work. It does not claim the application has been implemented or tested.

## Academic integrity
AI-assisted drafting was used for initial documentation and issue organisation. The four-member team remains responsible for reviewing, understanding and approving the work, and for recording genuine contributions.

## Sprint 2 submission evidence

- [Sprint 2 requirements and design submission report](docs/SPRINT2_SUBMISSION_REPORT.md)
- [One editable Draw.io sheet with five diagram types](docs/StockWise_Sprint2_Repo_Editable_Diagrams.drawio)
- [Five diagram types and evidence map](docs/SPRINT2_EDITABLE_DIAGRAMS.md)
- [Verified GitHub issues and story-number mapping](docs/SPRINT2_GITHUB_VERIFICATION.md)
- [Design index](docs/SPRINT2_DESIGN_INDEX.md)

Sprint 2 is requirements and design work. Open Backlog issues are not implementation-completion evidence. The original 21 duplicate stories (#3–#23) were closed and replaced by Harsh-authored issues #40–#60.

**Sprint 2 design update:** [One-sheet editable Draw.io source](docs/StockWise_Sprint2_Repo_Editable_Diagrams.drawio) includes all three mandatory diagram types (use cases, wireframes, user flows) and both optional types (activity and sequence). See the [diagram evidence index](docs/SPRINT2_EDITABLE_DIAGRAMS.md). The final binary Word/PDF submission package is provided separately, not committed to this repository.

## Sprint 3 — Working Prototype (31 October 2026)

**Initial source code committed. This is not yet a tested or completed Sprint 3 submission.**

The `main` branch now contains a Node.js + Express + Pug + MySQL **read-only** prototype scaffold with dashboard, product list/search, product details, supplier directory and movement history. It includes a relational MySQL schema, demo seed data and responsive CSS.

**Run locally (Docker Desktop):**
```bash
docker compose up --build
```
Open [http://localhost:3000](http://localhost:3000). Alternatively use Node.js 20+, MySQL 8.4, `npm install`, `.env`, `db/schema.sql` and `db/seed.sql`. See the [Sprint 3 setup and smoke-test guide](docs/SPRINT3_SETUP.md).

**Sprint 3 task issues:** [#61–#69](https://github.com/harsh-patel1408/StockWise-Inventory-Management-System/issues?q=is%3Aissue+label%3A%22Sprint+3%22). All assigned tasks remain open until their actual owners test/review and submit evidence.

**Current limitations:** Database and browser integration have not been executed in this environment; dependencies could not be installed here. No completed CRUD, authentication or production deployment is claimed. Initial scaffold commits were made using the connected Harsh account with AI assistance, not by the other three members.

## Sprint 3 local browser verification (separate starter package)

The user ran a **separate** local Sprint 3 prototype against MariaDB 10.4.32 and supplied screenshots confirming the dashboard, products, suppliers and movements pages, along with five passing tests. This local package has 12 products / 4 suppliers / 17 movements, while the root repository scaffold has a different sample dataset. See [local verification and remaining gaps](docs/SPRINT3_LOCAL_TEST_RESULTS_2026-10-31.md). The exact locally tested source has **not** been merged into this repository; do not conflate the two codebases.
