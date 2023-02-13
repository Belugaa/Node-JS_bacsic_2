const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');

router.post('/login', loginController.login);
router.get('/me', loginController.isMe);
router.post('/doimk', loginController.changePW);

module.exports = router;