const express = require('express');
const router = express.Router();
const hoSoController = require('../../controllers/hoSoController');

router.get('/', hoSoController.searchHoSo);
router.get('/nv', hoSoController.allNhanVien);
router.get('/:id', hoSoController.getNhanVien);
router.post('/:id/edit', hoSoController.updateHoSo);
// router.post('/create',hoSoController.createNewHoSo);
router.post('/delete/:id',hoSoController.deleteHoSo);
// router.get('/edit-profile/:id',hoSoController.editAccount);
// router.post('/update-profile/:id', hoSoController.updateAccount);

module.exports = router;