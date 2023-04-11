const router = require('express').Router();
const {newFollow,unFollow,getFollows,getFollowings,getFollowsById,getFollowingsById} = require('../Controllers/FollowController');

router.route('/new').post(newFollow);
router.route('/unfollow/:id').delete(unFollow);
router.route('/follows').get(getFollows);
router.route('/followings').get(getFollowings);
router.route('/follows/:id').get(getFollowsById);
router.route('/followings/:id').get(getFollowingsById);

module.exports = router;