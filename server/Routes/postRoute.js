const router =  require("express").Router();
const {newPost,editPost,getAllPost,deletePost, getPost, getPostsById} = require('../Controllers/PostController');

router.route('/new').post(newPost);
router.route('/edit').put(editPost);
router.route('/get').get(getAllPost);
router.route('/get/:id').get(getPost);
router.route('/getposts/:id').get(getPostsById);
router.route('/delete/:id').delete(deletePost);

module.exports = router;