const router = require('express').Router();
const productsController = require('../../controllers/productsController');

router.get('/', productsController.getAll);

module.exports = router;