const db = require('../config/db');
const { normaliseSearch, validId } = require('../utils/validation');

async function getDashboard() {
  const [[summary]] = await db.query(`
    SELECT COUNT(*) AS totalProducts,
      COALESCE(SUM(quantity), 0) AS totalUnits,
      COALESCE(SUM(quantity * price), 0) AS stockValue,
      COALESCE(SUM(CASE WHEN quantity <= reorder_level THEN 1 ELSE 0 END), 0) AS lowStock
    FROM products`);
  const [recent] = await db.query(`
    SELECT m.id, m.movement_type, m.quantity, m.created_at, p.name AS product_name, p.sku
    FROM stock_movements m JOIN products p ON p.id = m.product_id
    ORDER BY m.created_at DESC, m.id DESC LIMIT 6`);
  return { summary, recent };
}
async function getProducts({ search = '', low = false } = {}) {
  const q = normaliseSearch(search);
  const filters = [], params = [];
  if (q) { filters.push('(p.name LIKE ? OR p.sku LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
  if (low) filters.push('p.quantity <= p.reorder_level');
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const [products] = await db.query(`
    SELECT p.id, p.sku, p.name, p.description, p.price, p.quantity, p.reorder_level,
           s.name AS supplier_name, s.id AS supplier_id
    FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id
    ${where} ORDER BY p.name ASC LIMIT 200`, params);
  return products;
}
async function getProduct(id) {
  const productId = validId(id);
  if (!productId) return null;
  const [[product]] = await db.query(`
    SELECT p.*, s.name AS supplier_name, s.email AS supplier_email,
           s.phone AS supplier_phone
    FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id WHERE p.id = ?`, [productId]);
  if (!product) return null;
  const [history] = await db.query(`
    SELECT id, movement_type, quantity, note, created_at
    FROM stock_movements WHERE product_id = ? ORDER BY created_at DESC, id DESC LIMIT 30`, [productId]);
  return { product, history };
}
async function getSuppliers() {
  const [suppliers] = await db.query(`
    SELECT s.id, s.name, s.email, s.phone, s.address, COUNT(p.id) AS product_count
    FROM suppliers s LEFT JOIN products p ON p.supplier_id = s.id
    GROUP BY s.id, s.name, s.email, s.phone, s.address ORDER BY s.name`);
  return suppliers;
}
async function getMovements() {
  const [rows] = await db.query(`
    SELECT m.id, m.movement_type, m.quantity, m.note, m.created_at,
           p.id AS product_id, p.name AS product_name, p.sku
    FROM stock_movements m JOIN products p ON p.id = m.product_id
    ORDER BY m.created_at DESC, m.id DESC LIMIT 100`);
  return rows;
}
module.exports = { normaliseSearch, validId, getDashboard, getProducts, getProduct, getSuppliers, getMovements };
