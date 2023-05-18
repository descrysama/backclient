const express = require('express');
const router = express.Router();
const mobilaxLinksController = require('../controllers/mobilaxLinksController');

router.get('/get', mobilaxLinksController.getAllLinks);
router.post('/create', mobilaxLinksController.addLink);
router.delete('/delete/:id', mobilaxLinksController.deleteLink);

module.exports = router;