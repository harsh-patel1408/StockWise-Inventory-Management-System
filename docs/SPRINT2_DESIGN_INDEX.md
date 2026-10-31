# Sprint 2 — Requirements and Design Index

**Course:** Software Development 2 (CMP-L004-0)  
**Project:** StockWise — single-store inventory management  
**Sprint 2 deadline:** 4 November 2026, 2:00 PM

## Work items

- **23 user stories**: issues `#3–#23` (US-01–US-21) and `#38–#39` (US-22–US-23).
- **14 design and planning tasks**: issues `#24–#37` (S2-01–S2-14).
- Labels: `Sprint 2`, functional area and `priority:must`/`priority:should`.
- All issue owners are from the original four-person Sprint 1 team.
- Issue checkboxes remain unchecked until the team reviews and validates actual evidence.

## Design scope

### Personas and use cases
- Shop owner: catalogue maintenance, supplier lookup, low-stock review, stock oversight.
- Stock assistant: search products, record stock in/out, view stock movement history.
- Role-based access assumptions require team confirmation.

### Wireframes
1. Dashboard with total products and low-stock summary.
2. Products list with search and low-stock filter.
3. Product create/edit and product detail.
4. Supplier directory and supplier create/edit.
5. Record stock movement (IN/OUT).
6. Read-only movement history.

### User flows
1. Owner identifies a low-stock product and opens linked supplier.
2. Assistant records IN or OUT movement with validation and confirmation.
3. Master-data validation handles duplicate SKU, invalid fields and linked deletion.

## Non-negotiable data rules
- SKU unique; supplier linked to product.
- Price and reorder level non-negative; reorder level integer.
- New product quantity starts at 0.
- Stock movements use positive integer quantities.
- OUT quantity cannot exceed balance.
- IN/OUT movement and product balance are saved in one transaction; rollback on failure.
- Stock movement history is retained and corrections are compensating movements.
- Low stock when `quantity_on_hand <= reorder_level`.

## Review checklist
- [ ] Original team reviews all user stories and acceptance criteria.
- [ ] Wireframes and use-case diagram peer reviewed.
- [ ] Editable draw.io design source uploaded or linked.
- [ ] Requirements/design Word or PDF report uploaded or linked.
- [ ] GitHub Project board has all Sprint 2 items with status and priority fields.
- [ ] Team records actual completion evidence, comments and review decisions.
- [ ] Ten-minute Sprint 2 demonstration rehearsed.

## Evidence status
Initial report and editable draw.io source were prepared separately; **they have not yet been committed to this repository**. Do not mark their GitHub evidence complete until uploaded or linked and checked. The Project board may also require manual configuration because the current GitHub connection exposes issue-management actions but no Project-board field editing.
