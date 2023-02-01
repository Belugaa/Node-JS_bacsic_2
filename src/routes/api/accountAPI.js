const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.post('/create-new-acc',accountController.createNewAccount);
router.post('/delete-acc/:id',accountController.deleteAccount);
router.get('/edit-acc/:id',accountController.editAccount);
router.post('/update-acc/:id', accountController.updateAccount);

module.exports = router;