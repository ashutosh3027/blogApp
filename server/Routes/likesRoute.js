const router = require('express').Router();
const {newLike,deleteLike} = require('../Controllers/LikesController');

router.route('/new').post(newLike);
router.route('/delete/:post_id').delete(deleteLike);

module.exports = router;