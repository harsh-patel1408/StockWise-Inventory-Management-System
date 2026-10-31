const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
test('required Sprint 3 Pug pages and MySQL schema exist', () => {
  for (const file of ['src/views/dashboard.pug','src/views/products.pug','src/views/suppliers.pug','src/views/movements.pug','src/views/product-detail.pug','db/schema.sql','db/seed.sql']) {
    assert.ok(fs.existsSync(path.join(root,file)), file);
  }
});
test('schema includes unique SKU, supplier foreign key and positive movement', () => {
  const sql = read('db/schema.sql');
  assert.match(sql,/UNIQUE KEY uq_products_sku/);
  assert.match(sql,/FOREIGN KEY \(supplier_id\)/);
  assert.match(sql,/CHECK \(quantity > 0\)/);
});
test('seed has expected products and low stock examples', () => {
  const sql = read('db/seed.sql');
  for (const sku of ['STK-001','STK-002','STK-004','STK-010','STK-012']) assert.ok(sql.includes(sku));
});
