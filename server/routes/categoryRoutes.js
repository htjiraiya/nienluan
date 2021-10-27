const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl');

router.get('/category',categoryCtrl.getCategories);
router.post('/category',categoryCtrl.createCategory);
router.put('/category/:id',categoryCtrl.updateCategory);
router.delete('/category/:id',categoryCtrl.deleteCategory);

module.exports = router;