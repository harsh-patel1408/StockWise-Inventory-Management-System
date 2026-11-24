-- StockWise Sprint 3 root demo: read-only verification for #62 and #66.
-- Expected on a fresh import: 3 suppliers, 8 products, 7 movements,
-- 4 low-stock products, and 101 units; see docs/SPRINT3_VINAY_DATABASE_VERIFICATION.md.
USE stockwise;

SELECT 'suppliers' AS metric, COUNT(*) AS actual, 3 AS expected,
       IF(COUNT(*) = 3, 'PASS', 'FAIL') AS result FROM suppliers
UNION ALL
SELECT 'products', COUNT(*), 8, IF(COUNT(*) = 8, 'PASS', 'FAIL') FROM products
UNION ALL
SELECT 'movements', COUNT(*), 7, IF(COUNT(*) = 7, 'PASS', 'FAIL') FROM stock_movements
UNION ALL
SELECT 'low_stock', COUNT(*), 4, IF(COUNT(*) = 4, 'PASS', 'FAIL')
  FROM products WHERE stock_quantity <= reorder_level
UNION ALL
SELECT 'units', COALESCE(SUM(stock_quantity), 0), 101,
       IF(COALESCE(SUM(stock_quantity), 0) = 101, 'PASS', 'FAIL')
  FROM products;

-- Each product must link to an existing supplier (or have a NULL supplier).
SELECT p.sku, p.name, s.name AS supplier_name, p.stock_quantity, p.reorder_level,
       IF(p.stock_quantity <= p.reorder_level, 'LOW', 'OK') AS stock_status
FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id
ORDER BY p.id;

SELECT s.id, s.name, COUNT(p.id) AS linked_products
FROM suppliers s LEFT JOIN products p ON p.supplier_id = s.id
GROUP BY s.id, s.name ORDER BY s.id;

-- Demo opening movement balances must match stored quantity, including zero-stock products.
SELECT p.sku, p.stock_quantity AS stored_balance,
       COALESCE(m.ledger_balance, 0) AS movement_balance,
       IF(p.stock_quantity = COALESCE(m.ledger_balance, 0), 'PASS', 'FAIL') AS result
FROM products p
LEFT JOIN (
  SELECT product_id, SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE -quantity END) AS ledger_balance
  FROM stock_movements GROUP BY product_id
) m ON m.product_id = p.id ORDER BY p.id;

SELECT COUNT(*) AS orphan_supplier_links FROM products p
  LEFT JOIN suppliers s ON s.id = p.supplier_id
  WHERE p.supplier_id IS NOT NULL AND s.id IS NULL;
SELECT COUNT(*) AS orphan_movement_links FROM stock_movements m
  LEFT JOIN products p ON p.id = m.product_id WHERE p.id IS NULL;

-- Confirm that InnoDB actually registered the required constraints.
SELECT table_name, constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_schema = DATABASE()
  AND constraint_name IN (
    'fk_product_supplier', 'fk_movement_product',
    'ck_product_price', 'ck_movement_quantity'
  )
ORDER BY table_name, constraint_name;
