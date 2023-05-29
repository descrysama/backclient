const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const Middle = require('../middlewares/authenticateToken')

router.get('/get', linksController.getAllLinks);
router.delete('/delete/:id', Middle.authToken, linksController.deleteLink);
router.post('/create', Middle.authToken, linksController.createLink);

module.exports = router;