const express = require('express');
const router = express.Router();
const skuController = require('../controllers/skuController');
const Middle = require('../middlewares/authenticateToken')

router.get('/get', skuController.getAllSkus);
router.get('/get/:skuId', skuController.getSingle);
router.delete('/delete/:id', Middle.authToken, skuController.deleteSkuAndUrls);
router.patch('/update/:id', Middle.authToken, skuController.updateSku);
router.post('/create', Middle.authToken, skuController.createSku);
router.post('/search', Middle.authToken, skuController.searchSku);

module.exports = router;