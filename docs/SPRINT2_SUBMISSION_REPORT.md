# StockWise — Sprint 2 submission and design evidence

**University of Roehampton · Software Development 2 · CMP-L004-0**  
**Sprint 2 deadline:** 4 November 2026, 2:00 PM  
**Project:** Single-store inventory management web application  
**Team:** Harsh Patel (@harsh-patel1408), Kunjan (@kunjan130), Aavash (@aavashtuladharku-git), Vinay (@vinaybadavath123)

> **Evidence status:** This is a requirements/design submission, **not** a claim of implemented features, completed acceptance tests or approved team review. The Scrum board currently contains 37 active Sprint 2 issues plus two Sprint 1 issues in Backlog. Board status must reflect genuine progress as the team reviews work.

## 1. Aim, business need and scope

StockWise replaces scattered manual stock records with a central product catalogue, supplier directory and dated stock-movement ledger. The owner needs to identify low-stock products and find suppliers; the stock assistant needs to receive and issue stock accurately. The scope covers CRUD for product and supplier master data, inventory viewing/search, stock IN/OUT, movement history and low-stock monitoring. Payment, purchase ordering, multi-store support and external integrations are out of scope.

**Planned technology (not verified as implemented):** Pug front-end, Node.js with Express back-end, MySQL persistence, Git version control and Docker deployment, consistent with the assessment brief.

## 2. Personas and scenarios

**Sapna — shop owner.** Needs a concise inventory dashboard, product search, low-stock visibility, supplier details and safe product/supplier maintenance. **Scenario:** Open dashboard → filter products at or below reorder level → open product → inspect linked supplier → decide whether to replenish.

**Sandeep — stock assistant.** Needs fast product lookup, validated stock IN/OUT entry and traceable movement history. **Scenario:** Search SKU → select product → choose IN → enter positive quantity and note → confirm → view updated balance and dated movement record. An OUT movement above available stock must be rejected.

**Access assumptions:** Shop-owner master-data editing and assistant movement recording are proposed UX roles, pending team review; authentication is not asserted as an implemented feature.

## 3. User stories — complete issue catalogue

| ID | Story outcome | GitHub issue |
|---|---|---|
| US-01 | View inventory dashboard | [#40](../issues/40) |
| US-02 | Search products by name or SKU | [#41](../issues/41) |
| US-03 | Filter low-stock products | [#42](../issues/42) |
| US-04 | View product details | [#43](../issues/43) |
| US-05 | Create a product | [#44](../issues/44) |
| US-06 | Update product information | [#45](../issues/45) |
| US-07 | Delete eligible product | [#46](../issues/46) |
| US-08 | Prevent duplicate SKUs | [#47](../issues/47) |
| US-09 | View supplier directory | [#48](../issues/48) |
| US-10 | Create a supplier | [#49](../issues/49) |
| US-11 | Update supplier details | [#50](../issues/50) |
| US-12 | Protect linked supplier records | [#51](../issues/51) |
| US-13 | Open supplier from product details | [#52](../issues/52) |
| US-14 | Record stock-in | [#53](../issues/53) |
| US-15 | Record stock-out | [#54](../issues/54) |
| US-16 | Reject stock-out above available balance | [#55](../issues/55) |
| US-17 | Validate movement quantity | [#56](../issues/56) |
| US-18 | View dated movement history | [#57](../issues/57) |
| US-19 | See updated balance after movement | [#58](../issues/58) |
| US-20 | Record a correction transparently | [#59](../issues/59) |
| US-21 | Validate non-negative product values | [#60](../issues/60) |
| US-22 | Keep balance and movement history consistent | [#38](../issues/38) |
| US-23 | Start new products at zero stock | [#39](../issues/39) |

Each linked issue contains the full user-story text, acceptance criteria, priority, functional-area labels and team assignee(s). The old #3–#23 issues were closed as duplicates and must not be counted as completed work. [Verified issue register](SPRINT2_GITHUB_VERIFICATION.md).

## 4. Business rules and validation

1. Each product has a unique SKU and links to one supplier.
2. New products start with quantity 0; opening stock must be an IN movement.
3. Product price and reorder level cannot be negative; reorder level is an integer.
4. Stock movement quantity is a positive integer and is dated.
5. OUT cannot exceed current balance; quantity must never become negative.
6. Stock balance and movement insert commit atomically in a MySQL transaction, or both roll back.
7. Movement history is retained; corrections use compensating movements rather than silent deletion.
8. A product is low stock if quantity_on_hand <= reorder_level.
9. A product may be deleted only with zero balance and no movement history.
10. A supplier cannot be deleted while products reference it.

## 5. Use-case model

The shop owner views dashboard, searches products, filters low stock, manages product and supplier records and views stock history. The stock assistant searches products, records IN/OUT and views movement history. Product creation includes SKU and non-negative validation; stock OUT includes balance validation. See the [single integrated editable Draw.io diagram](StockWise_Sprint2_Repo_Editable_Diagrams.drawio) and its [Mermaid version](SPRINT2_EDITABLE_DIAGRAMS.md).

## 6. UI wireframes and screen map

| Screen | Main controls / content | Stories |
|---|---|---|
| Dashboard | Total products, low-stock count, stock overview, low-stock filter | US-01, US-03 |
| Products | Search by name/SKU, inventory list, open details | US-02, US-04 |
| Product create/edit/detail | Name, SKU, supplier, price, reorder level, validation, linked supplier | US-05–US-08, US-13, US-21, US-23 |
| Suppliers | Directory, add/edit, linked-record safeguards | US-09–US-12 |
| Stock movement | Product, IN/OUT, positive quantity, available balance, note, submit | US-14–US-17, US-19, US-22 |
| Movement history | Timestamp, type, quantity, resulting balance, correction note | US-18, US-20, US-22 |

The Word/PDF design pack contains one integrated system diagram and a six-screen wireframe specification table; it does not claim that separate full-fidelity wireframe mockups have been approved. All example stock numbers and products are illustrative, not live data.

## 7. User flows

**Owner:** Dashboard → low-stock filter → select product → supplier details → return to overview.

**Assistant:** Search product → choose IN/OUT → validate quantity → if OUT, compare with balance → commit movement and balance together → confirmation/history; otherwise show validation error.

**Master data:** Enter product/supplier → validate required fields, SKU uniqueness and non-negative values → save; on attempted deletion check linked records and history → either delete safely or explain why blocked.

The owner and assistant paths appear together in the [one integrated diagram](StockWise_Sprint2_Repo_Editable_Diagrams.drawio).

## 8. Task board, ownership and evidence

**Scrum board:** https://github.com/users/harsh-patel1408/projects/1

- Active Sprint 2 work: 23 user stories + 14 design/planning tasks = **37**; all created by @harsh-patel1408.
- Two existing Sprint 1 issues remain on the board, giving **39 Backlog cards**.
- Board view verified by user screenshot on 31 October: Backlog 39, Ready 0, In Progress 0, In Review 0, Done 0.
- Tasks [#24–#37](../issues/24) cover persona review, stories, board, use cases, wireframes, flows, criteria review, traceability, peer review and demonstration.
- Proposed functional split: Harsh (backend/architecture), Kunjan (UX/wireframes), Aavash (frontend), Vinay (database/test). **Issue assignees reflect proposed ownership, not proof of contributions.**
- Team must review acceptance criteria, comment with evidence and move cards to Ready/In Progress/In Review/Done only when warranted.

## 9. Traceability and acceptance test plan

| Requirement group | Stories | Design evidence | Planned checks |
|---|---|---|---|
| Dashboard/search | US-01–04 | Dashboard and products wireframes, owner flow | Counts, SKU search, low-stock threshold |
| Product master data | US-05–08, US-21, US-23 | Product form, validation flow | Unique SKU, non-negative fields, zero opening balance |
| Supplier data | US-09–13 | Supplier screens, linked-record validation | CRUD, linked supplier navigation, delete protection |
| Movement/history | US-14–20, US-22 | Movement form, history, assistant flow | IN, OUT, overdraw rejection, positive quantity, audit trail, atomic update |

**Planned acceptance tests (not executed):** AT-01 dashboard counts; AT-02 search by SKU; AT-03 low-stock boundary; AT-04 create product; AT-05 duplicate SKU; AT-06 supplier linkage; AT-07 supplier deletion blocked; AT-08 stock IN; AT-09 valid OUT; AT-10 excessive OUT rejected; AT-11 zero/negative movement rejected; AT-12 movement history and balance consistency. The detailed scenarios are in the Word report.

## 10. Sprint review and handover

Suggested 10-minute review: 1 minute project scope and team; 2 minutes personas/scenarios; 2 minutes stories and board; 2 minutes use cases/user flows; 2 minutes wireframes and validation; 1 minute review feedback and Sprint 3 handover. All members should attend as required by the brief.

**Sprint 3 handover:** MySQL schema and seed data; Pug screens; Express/Node routes; initial database-driven views; Git contributions by all members; Docker configuration toward final release. These are future deliverables, **not Sprint 2 implementation claims**.

## 11. Submission and integrity checks

- [x] 23 stories defined with acceptance criteria and GitHub issue links
- [x] 14 design/planning issues defined and assigned
- [x] Personas and scenarios drafted
- [x] Use-case, wireframes and user-flow design artefacts prepared
- [x] Scrum board columns and corrected issue set verified by screenshot
- [ ] Team peer review and evidence of individual contributions
- [ ] Attach final PDF/Word and draw.io files to GitHub or link them from this index
- [ ] Confirm all review comments and assumptions
- [ ] Submit required deliverables via Moodle before deadline; attend review

## 12. References and AI declaration

[1] University of Roehampton, *Software Development 2 (CMP-L004-0) Coursework Assessment Brief*, 2026, pp. 1–5, 8–10, 15.  
[2] StockWise team, *Sprint 1 proposal and personas*, internal project document, 2026.  
[3] GitHub, *StockWise repository, issues and Scrum Task Board*, accessed 31 October 2026.

**AI assistance disclosure:** ChatGPT assisted in drafting and formatting the requirements/design documentation, diagrams and acceptance criteria, and in administering GitHub issues. All project assumptions, diagrams and stories require team verification. No unperformed testing, implementation or peer review is represented as completed. Team members remain responsible for accuracy, originality, compliance and their own contributions.
