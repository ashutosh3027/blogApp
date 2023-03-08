const router = require('express').Router();
const {newFollow,unFollow,getFollows,getFollowings} = require('../Controllers/FollowController');

router.route('/new').post(newFollow);
router.route('/unfollow').delete(unFollow);
router.route('/follows').get(getFollows);
router.route('/followings').get(getFollowings);

module.exports = router;