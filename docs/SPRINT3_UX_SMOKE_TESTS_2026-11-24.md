# Sprint 3 UX review and smoke tests — 24 November 2026

This AI-assisted work covers #63 and #67 for `prototypes/local-tested-sprint3/`. Checks ran against the seeded MariaDB 11.8.9 database with Node.js 24.22.3 and Chromium at 1200 px, 390 px, and 320 px viewport widths.

## UX changes

- Darkened supporting text, table headings and inventory status badges. The dashboard metric note went from 3.15:1 to 6.02:1, the movement timestamp from 2.68:1 to 6.02:1, and the low-stock badge from 4.06:1 to 6.93:1. All sampled pairs after the change measured at least 5.65:1.
- Made the product search label visible above its field. The label remains visible after an entry and while filters are active.
- Allowed values in the product detail grid to wrap so the supplier email fits at 320 px. Tables on narrow screens keep their horizontal scroll within the page panel.

## Actual smoke-test results

| Screen or interaction | Observed result |
| --- | --- |
| Dashboard | 12 products, 271 units, 5 low-stock alerts and £2,034.85. [Desktop screenshot](evidence/sprint3-ux-2026-11-24/desktop-dashboard.png) |
| Products | 12 rows, or 5 with the low-stock filter. [Mobile screenshot](evidence/sprint3-ux-2026-11-24/mobile-products.png) |
| Product search | `STK-004` with the low-stock filter returned only USB-C Charging Cable. A name search found Blue Ballpoint Pens. An unmatched search displayed the empty state. |
| Product detail | `/products/2` showed Blue Ballpoint Pens, its linked supplier and two movement records. The supplier block no longer clipped at 320 px. |
| Suppliers | 4 supplier rows. [Mobile screenshot](evidence/sprint3-ux-2026-11-24/mobile-suppliers.png) |
| Movements | 17 movement rows. [Mobile screenshot](evidence/sprint3-ux-2026-11-24/mobile-movements.png) |
| Health and 404 | `/health` returned 200. Unknown routes and invalid or missing products returned 404. |

All five pages rendered without page-level horizontal overflow at the three tested widths. `npm run check` and the five existing automated tests passed. These tests sampled the listed screens and text combinations in Chromium. Assigned-member review and the Scrum board update are pending.
