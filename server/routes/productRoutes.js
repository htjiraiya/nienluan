const router = require('express').Router();
const ProductCtrl = require('../controllers/productCtrl');


router.get('/product/:id', ProductCtrl.getProduct);
router.get('/product', ProductCtrl.getProducts);
router.post('/product', ProductCtrl.createProduct);
router.put('/product/:id', ProductCtrl.updateProduct);
router.delete('/product/:id', ProductCtrl.deleteProduct);

module.exports = router;