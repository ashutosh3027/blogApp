const db = require('../utils/db');

const newReply = async (req, res) => {
    try {
        const { message, comment_id } = req.body;
        const user_id = req.body.user.id;
        const newreply = await db.Replies.create({
            message, user_id, comment_id
        });
        const reply = await db.Replies.findOne({
            include: [{
                model: db.User,
                attributes: ['id', 'fullname']
            }],
            where: { id: newreply.id }
        })
        res.status(200).json({
            stauts: 'success, new Reply created',
            reply
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            stauts: 'newComment Reply error',
        });
    }
};

const editReply = async (req, res) => {
    try {
        const { id, message } = req.body;
        const user_id = req.body.user.id;
        const replies = await db.Replies.findAll({ where: { id } });
        if (replies[0].user_id !== user_id) {
            return res.status(404).json({
                status: "Unauthorized"
            });
        }
        await db.Replies.update({ message, updatedAt: db.Sequelize.literal("CURRENT_TIMESTAMP") }, { where: { id } });
        res.status(200).json({
            stauts: 'success, Reply edited',
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            stauts: 'editReply catch error',
        });
    }
};

const getAllReplies = async (req, res) => {
    try {
        const { comment_id, post_id } = req.query;
        const user_id = req.body.user.id;
        const post_user_id = await db.Posts.findOne({
            where: { id: post_id },
            attributes: ['user_id']
        });
        const check = await db.Follows.findOne({
            where: {
                user_id_follow: user_id,
                user_id_following: post_user_id.user_id
            }
        });
        if (check || Number(user_id) === Number(post_user_id.user_id)) {
            const replies = await db.Replies.findAll({
                include: [{
                    model: db.User,
                    attributes: ['id', 'fullname']
                }],
                where: { comment_id },
                order: [['updatedAt', 'DESC']]
            });
            return res.status(200).json({
                status: 'success, replies found',
                replies
            });
        } else {
            return res.status(404).json({
                status: "User not authorized"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'getAllReplies catch error',
        });
    }
};

module.exports = { newReply, editReply, getAllReplies }