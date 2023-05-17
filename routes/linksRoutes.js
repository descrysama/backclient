const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');

router.get('/get', linksController.getAllLinks);
router.delete('/delete/:id', linksController.deleteLink);
router.post('/create', linksController.createLink);

module.exports = router;