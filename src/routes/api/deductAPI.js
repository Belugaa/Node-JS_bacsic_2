const express = require('express');
const router = express.Router();
const KhauTruController = require('../../controllers/deductController');

router.get('/', KhauTruController.getAll);
router.get('/nv/:id', KhauTruController.detailKT);
router.get('/tong/:id', KhauTruController.sumDD);
router.post('/:id/update', KhauTruController.updateKT);
router.post('/create', KhauTruController.addKT);
router.post('/create/nv', KhauTruController.AddKTNv);

module.exports = router;