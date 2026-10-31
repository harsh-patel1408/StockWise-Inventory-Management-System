# StockWise — one integrated Sprint 2 diagram

This page contains **one** editable Mermaid diagram of the complete requirements and workflow, corresponding to the [single-page editable Draw.io file](StockWise_Sprint2_Repo_Editable_Diagrams.drawio). It includes the shop owner, stock assistant, key screens, validation, supplier/product updates, atomic stock movements and movement history. The diagram is a proposed design, not implementation evidence.

```mermaid
flowchart TD
  O["SHOP OWNER"] --> D["Dashboard and low-stock review"]
  D --> P["Product catalogue and details"]
  P --> S["Supplier directory and links"]
  S --> MV{"Validate SKU, fields and linked deletion"}
  MV --> Save["Save product / supplier master data"]

  A["STOCK ASSISTANT"] --> Search["Search product by name / SKU"]
  Search --> M["Record stock IN / OUT"]
  M --> Q{"Positive whole-number quantity? OUT within balance?"}
  Q -->|"Valid"| Atomic["Atomic stock update: movement + product balance"]
  Q -->|"Invalid"| Err["Show error; no balance or history change"]
  Err --> M

  Save --> Result["Current inventory, supplier links and dated movement history"]
  Atomic --> Result

  Rules["Shared rules: unique SKU; non-negative values; new product starts at zero; rollback on failure"] -.-> MV
  Rules -.-> Q
  Rules -.-> Atomic
```

The accompanying Word/PDF report includes the screen specification, acceptance criteria, story-to-screen traceability, user flows and validation details in text and tables. All user stories and task assignments are linked from the [submission report](SPRINT2_SUBMISSION_REPORT.md).
