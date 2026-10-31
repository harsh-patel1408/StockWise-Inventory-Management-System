const inventory = require('../repositories/inventory');

const render = (res, view, data) => res.render(view, { ...data, active: view });

async function dashboard(req, res) {
  const { summary, recent } = await inventory.getDashboard();
  render(res, 'dashboard', { title: 'Dashboard', summary, recent });
}
async function products(req, res) {
  const search = inventory.normaliseSearch(req.query.search);
  const low = req.query.low === '1';
  const items = await inventory.getProducts({ search, low });
  render(res, 'products', { title: 'Products', items, search, low });
}
async function productDetail(req, res) {
  const result = await inventory.getProduct(req.params.id);
  if (!result) return res.status(404).render('error', { title: 'Product not found', message: 'That product does not exist.', active: '' });
  render(res, 'product-detail', { title: result.product.name, ...result });
}
async function suppliers(req, res) {
  const items = await inventory.getSuppliers();
  render(res, 'suppliers', { title: 'Suppliers', items });
}
async function movements(req, res) {
  const items = await inventory.getMovements();
  render(res, 'movements', { title: 'Stock history', items });
}
module.exports = { dashboard, products, productDetail, suppliers, movements };
