const router =  require("express").Router();
const {signup,login,deleteUser,changePassword,logout,getUser} = require('../Controllers/UserController');

router.route('/newuser').post(signup);
router.route('/login').post(login);
router.route('/deleteuser').delete(deleteUser);
router.route('/changepassword').put(changePassword);
router.route('/logout').post(logout);
router.route('/').get(getUser);

module.exports = router;