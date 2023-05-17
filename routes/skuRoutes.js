const express = require('express');
const router = express.Router();
const skuController = require('../controllers/skuController');

router.get('/get', skuController.getAllSkus);
router.post('/create', skuController.createSku);

module.exports = router;