const express = require('express');
const router = express.Router();
const utopyaLinksController = require('../controllers/utopyaLinksController');
const Middle = require('../middlewares/authenticateToken')

router.get('/get', utopyaLinksController.getAllLinks);
router.post('/create', Middle.authToken, utopyaLinksController.addLink);
router.delete('/delete/:id', Middle.authToken, utopyaLinksController.deleteLink);

module.exports = router;