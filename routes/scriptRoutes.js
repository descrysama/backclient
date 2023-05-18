const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');

router.get('/get', scriptController.runScript);

module.exports = router;