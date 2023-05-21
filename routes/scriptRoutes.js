const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');

router.get('/get', scriptController.runScript);
router.get('/runmain', scriptController.runMain);

module.exports = router;