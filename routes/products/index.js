const router = require('express').Router();
const productsController = require('../../controllers/productsController');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getProductById);

module.exports = router;