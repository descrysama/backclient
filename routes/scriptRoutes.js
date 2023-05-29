const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');
const Middle = require('../middlewares/authenticateToken')

router.get('/get', Middle.authToken, scriptController.runScript);
router.get('/runmain', Middle.authToken, scriptController.runMain);

module.exports = router;