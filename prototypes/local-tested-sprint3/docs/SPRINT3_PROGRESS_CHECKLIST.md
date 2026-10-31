# Sprint 3 implementation and evidence checklist

## Assessment requirements (official brief)
- [ ] Updated task board of user stories reflecting **actual** technical progress.
- [ ] GitHub repository demonstrating **real work from all team members**.
- [x] Database schema SQL drafted (suppliers, products, stock movements).
- [x] Pre-filled sample data SQL drafted (4 suppliers, 12 products, 17 movement rows).
- [x] Pug templates for static page structure drafted.
- [x] Express routes and MySQL-backed Pug view queries drafted.
- [ ] **Local MySQL import executed and verified.**
- [ ] **Application running against local MySQL and screenshots captured.**
- [ ] **All teammates review, test and contribute through their own GitHub accounts.**
- [ ] Working demo and review meeting completed.

## Traceability
| Sprint 2 story | Sprint 3 view | Evidence |
|---|---|---|
| US-01 | Dashboard `/` | Counts and low stock from DB |
| US-02 | Products `/products?search=...` | Name/SKU search |
| US-03 | Products `/products?low=1` | Low-stock filter |
| US-04 | `/products/:id` | Product details |
| US-09 | `/suppliers` | Supplier list |
| US-13 | `/products/:id` | Linked supplier info |
| US-18 | `/movements` | Dated movement history |
| US-19 | `/products/:id` | Current quantity display |

The remaining stories, especially CRUD and stock writes, are **not implemented** in this read-only Sprint 3 scaffold.

## Team verification before submission
1. Import schema and seed into a running MySQL server.
2. Run `npm install`, `npm test`, `npm start` and visit all pages.
3. Confirm expected low stock: 5 products (STK-002, 004, 006, 008, 010).
4. Check a nonexistent product returns 404 and missing MySQL shows friendly error.
5. Capture genuine screenshots and GitHub board status.
6. Each teammate submits their own meaningful commits and review notes.
7. Record blockers honestly; do not mark tasks Done without evidence.
