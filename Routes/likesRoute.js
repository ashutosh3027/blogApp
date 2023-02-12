const router = require('express').Router();
const {newLike,deleteLike,getAllLikes} = require('../Controllers/LikesController');

router.route('/new').post(newLike);
router.route('/delete').delete(deleteLike);
router.route('/get').get(getAllLikes);

module.exports = router;