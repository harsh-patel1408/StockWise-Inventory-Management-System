// Live MySQL tests for Sprint 3 issues #62 and #66.
// Run with STOCKWISE_DB_TEST=1 against an isolated seeded MySQL 8.x database.
const test = require('node:test');
const assert = require('node:assert/strict');
const mysql = require('mysql2/promise');

const enabled = process.env.STOCKWISE_DB_TEST === '1';
test('Sprint 3 MySQL demo data, joins, balances, and integrity (#62, #66)',
  { skip: enabled ? false : 'Set STOCKWISE_DB_TEST=1 to enable live database tests.' },
  async t => {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'stockwise',
      waitForConnections: true, connectionLimit: 2
    });
    try {
      await t.test('three suppliers, eight products, seven movements and four low-stock items', async () => {
        const [[r]] = await pool.query(`SELECT
          (SELECT COUNT(*) FROM suppliers) AS suppliers,
          (SELECT COUNT(*) FROM products) AS products,
          (SELECT COUNT(*) FROM stock_movements) AS movements,
          (SELECT COUNT(*) FROM products WHERE stock_quantity <= reorder_level) AS low_stock,
          (SELECT COALESCE(SUM(stock_quantity), 0) FROM products) AS units`);
        assert.deepEqual(
          [r.suppliers, r.products, r.movements, r.low_stock, Number(r.units)].map(Number),
          [3, 8, 7, 4, 101]
        );
      });
      await t.test('supplier-product LEFT JOIN produces the expected linked counts', async () => {
        const [rows] = await pool.query(`
          SELECT s.id, COUNT(p.id) AS product_count
          FROM suppliers s LEFT JOIN products p ON p.supplier_id = s.id
          GROUP BY s.id ORDER BY s.id`);
        assert.deepEqual(rows.map(r => [r.id, Number(r.product_count)]), [[1, 3], [2, 3], [3, 2]]);
      });
      await t.test('movement ledger and stored product balances match for all eight SKUs', async () => {
        const [rows] = await pool.query(`
          SELECT p.sku, p.stock_quantity, COALESCE(m.balance, 0) AS ledger_balance
          FROM products p LEFT JOIN (
            SELECT product_id, SUM(IF(movement_type='IN', quantity, -quantity)) AS balance
            FROM stock_movements GROUP BY product_id
          ) m ON m.product_id = p.id ORDER BY p.id`);
        assert.equal(rows.length, 8);
        for (const r of rows) assert.equal(Number(r.stock_quantity), Number(r.ledger_balance), r.sku);
      });
      await t.test('foreign keys, CHECK constraints, and SKU uniqueness are installed', async () => {
        const [constraints] = await pool.query(`
          SELECT constraint_name, constraint_type
          FROM information_schema.table_constraints
          WHERE table_schema = DATABASE()
            AND table_name IN ('products', 'stock_movements')`);
        const byName = new Map(constraints.map(c => [c.constraint_name, c.constraint_type]));
        assert.equal(byName.get('fk_product_supplier'), 'FOREIGN KEY');
        assert.equal(byName.get('fk_movement_product'), 'FOREIGN KEY');
        assert.equal(byName.get('ck_product_price'), 'CHECK');
        assert.equal(byName.get('ck_movement_quantity'), 'CHECK');
        assert.ok([...byName.values()].includes('UNIQUE'));
      });
      await t.test('invalid writes are rejected and supplier/product deletion is restricted', async () => {
        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();
          const rejectsWith = async (sql, params, errno) => {
            await assert.rejects(conn.query(sql, params), err => {
              assert.equal(err.errno, errno, err.message);
              return true;
            });
          };
          await rejectsWith(
            "INSERT INTO products (supplier_id, sku, name, price) VALUES (1, 'SW-1001', 'Duplicate SKU', 1)",
            [], 1062);
          await rejectsWith(
            "INSERT INTO products (supplier_id, sku, name, price) VALUES (1, 'TEST-BAD-PRICE', 'Invalid', -1)",
            [], 3819);
          await rejectsWith(
            "INSERT INTO products (supplier_id, sku, name, price) VALUES (999999, 'TEST-BAD-FK', 'Invalid', 1)",
            [], 1452);
          await rejectsWith(
            "INSERT INTO stock_movements (product_id, movement_type, quantity) VALUES (1, 'IN', 0)",
            [], 3819);
          await rejectsWith(
            "INSERT INTO stock_movements (product_id, movement_type, quantity) VALUES (999999, 'IN', 1)",
            [], 1452);
          await rejectsWith('DELETE FROM suppliers WHERE id = 1', [], 1451);
          await rejectsWith('DELETE FROM products WHERE id = 1', [], 1451);
        } finally {
          await conn.rollback();
          conn.release();
        }
      });
    } finally {
      await pool.end();
    }
  });
