const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');

router.get('/get', linksController.getAllLinks);
router.post('/create', linksController.createLink);

module.exports = router;