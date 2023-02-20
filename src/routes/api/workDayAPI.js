const express = require('express');
const router = express.Router();
const workDayController = require('../../controllers/workdayController');

router.get('/', workDayController.getAllWorkday);
router.get('/months', workDayController.getWDbyMonth);
router.get('/:id', workDayController.getWorkday);
router.post('/:id/create', workDayController.createWorkDay);
router.post('/:id/update', workDayController.updateWorkDay);
router.post('/month', workDayController.getWorkDayWithMonth);

module.exports = router;