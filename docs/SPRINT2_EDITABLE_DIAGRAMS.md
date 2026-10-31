# StockWise — editable Sprint 2 design diagrams

These diagrams are **editable Mermaid source** committed to the repository, complementing the full editable `.drawio` source supplied in the local Sprint 2 package. GitHub renders Mermaid in Markdown. Diagrams illustrate proposed requirements, not verified implementation.

## D1. Use-case / actor relationship diagram

```mermaid
flowchart LR
  Owner["Shop owner"]
  Assistant["Stock assistant"]
  subgraph StockWise["StockWise system boundary"]
    Dash(["View dashboard"])
    Low(["Filter low stock"])
    Search(["Search products"])
    Product(["Manage products"])
    Supplier(["Manage suppliers"])
    Detail(["View product / supplier"])
    In(["Record stock IN"])
    Out(["Record stock OUT"])
    History(["View movement history"])
    SKU(["Validate unique SKU"])
    Valid(["Validate movement quantity"])
    Balance(["Check available balance"])
  end
  Owner --> Dash & Low & Search & Product & Supplier & Detail & History
  Assistant --> Search & Detail & In & Out & History
  Product -. "includes" .-> SKU
  In -. "includes" .-> Valid
  Out -. "includes" .-> Valid
  Out -. "includes" .-> Balance
```

**Traceability:** US-01–US-23. The master-data edit/delete privileges are proposed for the owner; formal authentication is outside the verified Sprint 2 implementation.

## D2. Owner low-stock review flow

```mermaid
flowchart TD
  A([Open dashboard]) --> B["Display stock overview"]
  B --> C["Apply low-stock filter"]
  C --> D{"Items at or below reorder level?"}
  D -- No --> E["Display no low-stock items"]
  D -- Yes --> F["Select product"]
  F --> G["View quantity, SKU and reorder level"]
  G --> H["Open linked supplier details"]
  H --> I["Review contact and replenishment need"]
  E --> J([Return to dashboard])
  I --> J
```

**Stories:** US-01–04, US-09, US-13.

## D3. Assistant stock movement and validation flow

```mermaid
flowchart TD
  A([Search and select product]) --> B["Choose IN or OUT"]
  B --> C["Enter quantity and optional note"]
  C --> D{"Positive whole-number quantity?"}
  D -- No --> E["Show validation error"] --> C
  D -- Yes --> F{"Movement type"}
  F -- IN --> I["Begin database transaction"]
  F -- OUT --> G{"Quantity <= current balance?"}
  G -- No --> H["Reject OUT; show available balance"] --> C
  G -- Yes --> I
  I --> K["Insert dated movement and update product balance"]
  K --> L{"Both operations successful?"}
  L -- No --> M["Roll back transaction; show error"] --> C
  L -- Yes --> N["Commit transaction"]
  N --> O["Show updated balance and movement history"]
  O --> P([Finish])
```

**Stories:** US-14–20, US-22. Transactional integrity is a requirement, not an assertion that a MySQL transaction is implemented.

## D4. Master-data validation and deletion flow

```mermaid
flowchart TD
  A([Owner opens product/supplier form]) --> B["Enter or edit record"]
  B --> C{"Required fields valid?"}
  C -- No --> D["Explain missing or invalid values"] --> B
  C -- Yes --> E{"Product fields?"}
  E -- Yes --> F{"SKU unique; price and reorder level non-negative?"}
  F -- No --> D
  F -- Yes --> G["Save master record"]
  E -- No --> G
  G --> H([Show record details])
  I([Delete requested]) --> J{"Product or supplier?"}
  J -- Product --> K{"Zero stock and no movement history?"}
  J -- Supplier --> L{"No linked products?"}
  K -- Yes --> M["Delete record"]
  L -- Yes --> M
  K -- No --> N["Block deletion with reason"]
  L -- No --> N
  M --> O([Return to directory])
  N --> O
```

**Stories:** US-05–13, US-21, US-23.

## D5. UI navigation / wireframe map

```mermaid
flowchart LR
  Dashboard["Dashboard: counts and low-stock cards"] --> Products["Products: search and filters"]
  Dashboard --> Low["Low-stock list"]
  Low --> Detail["Product detail: balance, supplier and history"]
  Products --> Detail
  Products --> Form["Product create/edit form"]
  Detail --> Form
  Detail --> Supplier["Supplier directory / detail"]
  Supplier --> SupplierForm["Supplier create/edit form"]
  Detail --> Movement["Stock IN / OUT form"]
  Movement --> History["Dated movement history"]
  History --> Detail
```

**Screen inventory:** dashboard, products list, product form/detail, supplier list/form, movement entry and movement history. Visual wireframe images are embedded in the accompanying Word/PDF report.

## D6. Sequence view of atomic stock update

```mermaid
sequenceDiagram
  actor Assistant
  participant UI as Pug UI
  participant API as Express/Node.js
  participant DB as MySQL
  Assistant->>UI: Enter stock IN/OUT
  UI->>API: Submit product, type, quantity, note
  API->>API: Validate positive integer and request
  API->>DB: BEGIN; lock selected product
  DB-->>API: Current balance
  alt Invalid OUT quantity
    API->>DB: ROLLBACK
    API-->>UI: Validation error
  else Valid movement
    API->>DB: INSERT movement; UPDATE balance
    alt Database error
      API->>DB: ROLLBACK
      API-->>UI: Error, no partial change
    else Success
      API->>DB: COMMIT
      API-->>UI: New balance and confirmation
    end
  end
```

**Note:** This is a proposed sequence, not tested application code.

[Submission report](SPRINT2_SUBMISSION_REPORT.md) · [Verified issue register](SPRINT2_GITHUB_VERIFICATION.md) · [Design index](SPRINT2_DESIGN_INDEX.md)
