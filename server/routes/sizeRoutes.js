const router = require('express').Router();
const SizeCtrl = require('../controllers/sizeCtrl');


router.get('/size', SizeCtrl.getSize);
router.post('/size', SizeCtrl.createSize);
router.put('/size/:id', SizeCtrl.updateSize);
router.delete('/size/:id', SizeCtrl.deleteSize);


module.exports = router;