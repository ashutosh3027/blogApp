const router = require('express').Router();
const {newReply,editReply,getAllReplies} = require('../Controllers/ReplyController');

router.route('/new').post(newReply);
router.route('/edit').put(editReply);
router.route('/get').get(getAllReplies);

module.exports = router;