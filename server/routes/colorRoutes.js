const router = require('express').Router();
const ColorCtrl = require('../controllers/colorCtrl');

router.get('/color', ColorCtrl.getColor);
router.post('/color', ColorCtrl.createColor);
router.put('/color/:id', ColorCtrl.updateColor);
router.delete('/color/:id', ColorCtrl.deleteColor);

module.exports = router;