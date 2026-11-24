# Sprint 3 frontend demo — 24 November 2026

This AI-assisted implementation and verification covers #64 and #68 in `prototypes/local-tested-sprint3/`. The demo used the seeded MariaDB 11.8.9 database, Node.js 24.22.3, and Chromium at 1200 px and 390 px viewport widths.

## Frontend changes

- Tab reaches a visible **Skip to main content** link first. Enter moves focus to the main landmark, where Tab continues to the next control.
- Sidebar links expose the current page or section, including the Products section on a product detail page. Decorative sidebar icons are hidden from assistive technology.
- Tables use explicit column headers and named, keyboard-focusable scroll regions. Result labels use singular and plural forms.

## Browser demo

1. Open `/` to show the dashboard and its 12 products, 271 units, five low-stock alerts, and £2,034.85 inventory value.
2. Open **Products**, then press Tab and Enter on **Skip to main content**. Press Tab again to reach the labelled search field. [Desktop keyboard screenshot](evidence/sprint3-frontend-2026-11-24/desktop-keyboard-focus.png)
3. Search `STK-004` with **Low stock only** enabled. The result is USB-C Charging Cable. At 390 px, focus the table and press the right arrow to see its remaining columns. [Mobile filter screenshot](evidence/sprint3-frontend-2026-11-24/mobile-product-filter.png)
4. Open `/products/2` to show Blue Ballpoint Pens, its supplier, and two stock movements. Open **Suppliers** for four suppliers and **Movements** for 17 dated records.

At both tested widths, all five pages rendered, navigation states matched the page, and tables stayed within their scroll regions. Keyboard focus and form submission passed in Chromium. The five existing tests and JavaScript syntax checks also passed. This run covers the tested views and interactions. Assigned-member review and the Scrum board update are pending.
