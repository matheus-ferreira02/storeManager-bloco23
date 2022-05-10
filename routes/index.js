const router = require('express').Router();
const productsRoutes = require('./products');
const salesRoutes = require('./sales');

router.use('/products', productsRoutes);
router.use('/sales', salesRoutes);

module.exports = router;
