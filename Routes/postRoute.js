const router =  require("express").Router();
const {newPost,editPost,getAllPost,deletePost} = require('../Controllers/PostController');

router.route('/new').post(newPost);
router.route('/edit').put(editPost);
router.route('/get').get(getAllPost);
router.route('/delete').delete(deletePost);

module.exports = router;