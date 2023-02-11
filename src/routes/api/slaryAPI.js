const express = require('express');
const router = express.Router();
const salaryController = require('../../controllers/salaryController');

// router.get('/', salaryController.payRoll);
router.post('/:id', salaryController.payRoll);
// router.post('/delete-acc/:id',accountController.deleteAccount);
// router.get('/edit-acc/:id',accountController.editAccount);
// router.post('/update-acc/:id', accountController.updateAccount);

module.exports = router;