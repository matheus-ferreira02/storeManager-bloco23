const router = require('express').Router();
const rescue = require('express-rescue');
const salesController = require('../../controllers/salesController');
const validateBodySales = require('../../middlewares/validateBodySales');

router.get('/', rescue(salesController.getAll));

router.get('/:id', rescue(salesController.getSaleById));

router.post('/', rescue(validateBodySales), rescue(salesController.registerSale));

router.put('/:id', rescue(validateBodySales));

module.exports = router;