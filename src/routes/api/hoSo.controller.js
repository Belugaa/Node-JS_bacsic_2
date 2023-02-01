const express = require('express');
const router = express.Router();
const hoSoController = require('../../controllers/hoSo.controller');

router.get('/', hoSoController.getAllHoSo);
router.post('/create-new-profile',hoSoController.createNewHoSo);
// router.post('/delete-profile/:id',hoSoController.deleteAccount);
// router.get('/edit-profile/:id',hoSoController.editAccount);
// router.post('/update-profile/:id', hoSoController.updateAccount);

module.exports = router;