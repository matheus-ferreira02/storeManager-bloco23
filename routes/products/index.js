const router = require('express').Router();
const rescue = require('express-rescue');
const productsController = require('../../controllers/productsController');
const validateBody = require('../../middlewares/validateBody');

router.get('/', rescue(productsController.getAll));

router.get('/:id', rescue(productsController.getProductById));

router.post('/', validateBody);

module.exports = router;