const express = require('express');
const router = express.Router();
const workDayController = require('../../controllers/workdayController');

router.get('/', workDayController.getAllWorkday);

module.exports = router;