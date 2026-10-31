const express = require('express');
const db = require('../db/pool');
const router = express.Router();
const run = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

router.get('/', run(async (req, res) => {
  const [[stats]] = await db.query(`
    SELECT COUNT(*) AS products,
           COALESCE(SUM(stock_quantity),0) AS units,
           COALESCE(SUM(stock_quantity <= reorder_level),0) AS low_stock,
           COALESCE(SUM(stock_quantity * price),0) AS inventory_value
    FROM products
  `);
  const [lowStock] = await db.query(`
    SELECT p.id, p.sku, p.name, p.stock_quantity, p.reorder_level, s.name AS supplier
    FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id
    WHERE p.stock_quantity <= p.reorder_level
    ORDER BY p.stock_quantity ASC, p.name ASC LIMIT 8
  `);
  const [recent] = await db.query(`
    SELECT m.id, m.movement_type, m.quantity, m.created_at, p.name AS product
    FROM stock_movements m JOIN products p ON p.id = m.product_id
    ORDER BY m.created_at DESC, m.id DESC LIMIT 6
  `);
  res.render('dashboard', {title: 'Dashboard', stats, lowStock, recent});
}));

router.get('/products', run(async (req, res) => {
  const q = String(req.query.q || '').trim().slice(0, 100);
  const low = req.query.low === '1';
  const where = [];
  const params = [];
  if (q) { where.push('(p.name LIKE ? OR p.sku LIKE ?)'); params.push('%' + q + '%', '%' + q + '%'); }
  if (low) where.push('p.stock_quantity <= p.reorder_level');
  const [products] = await db.query(`
    SELECT p.id, p.sku, p.name, p.price, p.stock_quantity, p.reorder_level,
           s.name AS supplier
    FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY p.name ASC LIMIT 200
  `, params);
  res.render('products', {title: 'Products', products, q, low});
}));

router.get('/products/:id', run(async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) return res.status(404).render('error', {title:'Product not found', message:'Invalid product ID.', status:404});
  const [[product]] = await db.query(`
    SELECT p.*, s.name AS supplier, s.email AS supplier_email
    FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id
    WHERE p.id = ? LIMIT 1
  `, [req.params.id]);
  if (!product) return res.status(404).render('error', {title:'Product not found', message:'Product not found.', status:404});
  const [movements] = await db.query(`
    SELECT movement_type, quantity, note, created_at
    FROM stock_movements WHERE product_id = ?
    ORDER BY created_at DESC, id DESC LIMIT 30
  `, [product.id]);
  res.render('product', {title: product.name, product, movements});
}));

router.get('/suppliers', run(async (req, res) => {
  const [suppliers] = await db.query(`
    SELECT s.id, s.name, s.contact_name, s.email, s.phone,
           COUNT(p.id) AS product_count
    FROM suppliers s LEFT JOIN products p ON p.supplier_id = s.id
    GROUP BY s.id, s.name, s.contact_name, s.email, s.phone
    ORDER BY s.name
  `);
  res.render('suppliers', {title: 'Suppliers', suppliers});
}));

router.get('/movements', run(async (req, res) => {
  const [movements] = await db.query(`
    SELECT m.id, m.movement_type, m.quantity, m.note, m.created_at,
           p.name AS product, p.sku
    FROM stock_movements m JOIN products p ON p.id = m.product_id
    ORDER BY m.created_at DESC, m.id DESC LIMIT 100
  `);
  res.render('movements', {title: 'Stock movements', movements});
}));

module.exports = router;
