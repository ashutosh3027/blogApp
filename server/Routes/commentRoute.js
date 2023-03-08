const router =  require("express").Router();
const {newComment,editComment,getAllComments} = require('../Controllers/CommentController');

router.route('/new').post(newComment);
router.route('/edit').put(editComment);
router.route('/get').get(getAllComments);

module.exports = router;