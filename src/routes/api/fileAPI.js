const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/fileController');

router.get('/nv', fileController.NVxlsx);

module.exports = router;