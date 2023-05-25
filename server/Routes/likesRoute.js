const router = require('express').Router();
const {newLike,deleteLike,getAllLikes} = require('../Controllers/LikesController');

router.route('/new').post(newLike);
router.route('/delete/:post_id').delete(deleteLike);
router.route('/get/:post_id').get(getAllLikes);

module.exports = router;