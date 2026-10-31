const router = require('express').Router();
const c = require('../controllers/pages');
router.get('/', c.dashboard);
router.get('/products', c.products);
router.get('/products/:id', c.productDetail);
router.get('/suppliers', c.suppliers);
router.get('/movements', c.movements);
module.exports = router;
