const router = require('express').Router();
const rescue = require('express-rescue');
const productsController = require('../../controllers/productsController');
const validateBodyProducts = require('../../middlewares/validateBodyProducts');

router.get('/', rescue(productsController.getAll));

router.get('/:id', rescue(productsController.getProductById));

router.post('/', rescue(validateBodyProducts), rescue(productsController.createProduct));

router.put('/:id', rescue(validateBodyProducts), productsController.updateProduct);

module.exports = router;