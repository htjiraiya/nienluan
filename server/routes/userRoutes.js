const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

router.get('/refresh_token', userCtrl.refreshToken);

router.delete('/delete/:id', userCtrl.deleteUser);
router.get('/profile', auth ,userCtrl.getUser);
router.get('/profile/:id',userCtrl.getOneUser);
router.put('/profile', userCtrl.editUser);


router.get('/loaduser/:Role',auth, authAdmin, userCtrl.loaduser);

router.patch('/addcart', auth, userCtrl.addcart);

module.exports = router;