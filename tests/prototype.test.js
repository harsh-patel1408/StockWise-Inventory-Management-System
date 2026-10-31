const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('required Sprint 3 source files are present', () => {
  [
    'app.js', 'db/pool.js', 'db/schema.sql', 'db/seed.sql',
    'routes/pages.js', 'views/layout.pug', 'views/dashboard.pug',
    'views/products.pug', 'views/product.pug', 'views/suppliers.pug',
    'views/movements.pug', 'public/styles.css'
  ].forEach(file => assert.ok(read(file).length > 50, file));
});

test('MySQL schema includes three linked inventory tables', () => {
  const sql = read('db/schema.sql');
  for (const name of ['suppliers', 'products', 'stock_movements']) {
    assert.match(sql, new RegExp('CREATE TABLE IF NOT EXISTS ' + name));
  }
  assert.match(sql, /FOREIGN KEY \(supplier_id\)/);
  assert.match(sql, /FOREIGN KEY \(product_id\)/);
  assert.match(sql, /UNIQUE/);
});

test('seed data includes eight products and three suppliers', () => {
  const sql = read('db/seed.sql');
  assert.match(sql, /SW-1001/);
  assert.match(sql, /SW-1008/);
  assert.match(sql, /Northline Wholesale/);
  assert.match(sql, /FreshPack Distribution/);
});

test('routes expose all required read-only pages', () => {
  const routes = read('routes/pages.js');
  for (const url of ['/', '/products', '/products/:id', '/suppliers', '/movements']) {
    assert.ok(routes.includes("router.get('" + url + "'"), url);
  }
  assert.ok(!routes.includes('router.post('), 'Sprint 3 prototype is read-only');
});

test('templates use Pug inheritance and shared navigation', () => {
  assert.match(read('views/layout.pug'), /doctype html/);
  for (const file of ['dashboard', 'products', 'product', 'suppliers', 'movements']) {
    assert.match(read('views/' + file + '.pug'), /^extends layout/m);
  }
});
