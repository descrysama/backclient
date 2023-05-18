const express = require('express');
const router = express.Router();
const skuController = require('../controllers/skuController');

router.get('/get', skuController.getAllSkus);
router.get('/get/:skuId', skuController.getSingle);
router.delete('/delete/:id', skuController.deleteSkuAndUrls);
router.patch('/update/:id', skuController.updateSku);
router.post('/create', skuController.createSku);
router.post('/search', skuController.searchSku);

module.exports = router;