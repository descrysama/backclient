const express = require('express');
const router = express.Router();
const mobilaxLinksController = require('../controllers/mobilaxLinksController');
const Middle = require('../middlewares/authenticateToken')

router.get('/get', mobilaxLinksController.getAllLinks);
router.post('/create', Middle.authToken, mobilaxLinksController.addLink);
router.delete('/delete/:id', Middle.authToken, mobilaxLinksController.deleteLink);

module.exports = router;