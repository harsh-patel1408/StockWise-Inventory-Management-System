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
- [Editable draw.io diagrams](docs/StockWise_Sprint2_Repo_Editable_Diagrams.drawio)
- [Editable Mermaid diagrams](docs/SPRINT2_EDITABLE_DIAGRAMS.md)
- [Verified GitHub issues and story-number mapping](docs/SPRINT2_GITHUB_VERIFICATION.md)
- [Design index](docs/SPRINT2_DESIGN_INDEX.md)

Sprint 2 is requirements and design work. Open Backlog issues are not implementation-completion evidence. The original 21 duplicate stories (#3–#23) were closed and replaced by Harsh-authored issues #40–#60.
