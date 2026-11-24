const router = require('express').Router();
const c = require('../controllers/pages');

// Express 4 needs rejected controller promises forwarded to its error middleware.
const handle = (controller) => (req, res, next) => controller(req, res).catch(next);

router.get('/', handle(c.dashboard));
router.get('/products', handle(c.products));
router.get('/products/:id', handle(c.productDetail));
router.get('/suppliers', handle(c.suppliers));
router.get('/movements', handle(c.movements));
module.exports = router;
