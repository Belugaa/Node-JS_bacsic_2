const express = require('express');
const router = express.Router();
const PhuCapController = require('../../controllers/allowanceCotroller');

router.get('/', PhuCapController.getAll);
router.get('/nv/:id', PhuCapController.detailAL);
router.get('/tong/:id', PhuCapController.sumAL);
router.post('/:id/update', PhuCapController.updateAL);
router.post('/create', PhuCapController.addAL);
router.post('/create/nv', PhuCapController.AddAlNv);

module.exports = router;