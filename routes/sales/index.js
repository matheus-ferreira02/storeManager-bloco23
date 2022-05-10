const router = require('express').Router();
const rescue = require('express-rescue');
const salesController = require('../../controllers/salesController');

router.get('/', rescue(salesController.getAll));

router.get('/:id', rescue(salesController.getSaleById));

module.exports = router;