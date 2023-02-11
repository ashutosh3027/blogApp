const router =  require("express").Router();
const {signup,login,deleteUser,changePassword} = require('../Controllers/UserController');

router.route('/newuser').post(signup);
router.route('/login').post(login);
router.route('/deleteuser').delete(deleteUser);
router.route('/changepassword').put(changePassword);

module.exports = router;