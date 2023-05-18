const express = require('express');
const router = express.Router();
const utopyaLinksController = require('../controllers/utopyaLinksController');

router.get('/get', utopyaLinksController.getAllLinks);
router.post('/create', utopyaLinksController.addLink);
router.delete('/delete/:id', utopyaLinksController.deleteLink);

module.exports = router;