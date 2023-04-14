const router =  require("express").Router();
const {signup,login,deleteUser,changePassword,logout,getUser,getUserById,getUsers} = require('../Controllers/UserController');

router.route('/newuser').post(signup);
router.route('/login').post(login);
router.route('/delete/:password').delete(deleteUser);
router.route('/changepassword').put(changePassword);
router.route('/logout').post(logout);
router.route('/').get(getUser);
router.route('/get/:id').get(getUserById);
router.route('/search').get(getUsers)

module.exports = router;