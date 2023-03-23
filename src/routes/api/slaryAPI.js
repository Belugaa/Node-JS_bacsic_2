const express = require('express');
const router = express.Router();
const salaryController = require('../../controllers/salaryController');

router.get('/heso', salaryController.hesoluong);
router.get('/pl/:id', salaryController.getPhieuLuong);
router.get('/phieuluong/all',salaryController.PhieuLuong);
router.get('/nv', salaryController.luongNv);
router.get('/nv/:id', salaryController.dtluongNv);
router.get('/:id', salaryController.payRoll);
router.post('/phieuluong',salaryController.crPhieuLuong);
router.post('/bangluong/:id/update',salaryController.updateBL);
router.get('/phieuluong/month',salaryController.getPLWithMonth);
// router.get('/edit-acc/:id',accountController.editAccount);
// router.post('/update-acc/:id', accountController.updateAccount);

module.exports = router;