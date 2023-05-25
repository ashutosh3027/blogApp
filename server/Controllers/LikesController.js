const db = require('../utils/db');

const newLike = async (req, res) => {
    try {
        const { post_id } = req.body;
        const user_id = req.body.user.id;
        const count = await db.Likes.count({ where: { user_id, post_id } });
        if (count !== 0) {
            return res.status(404).json({
                status: "Like already exists",
            });
        }
        const newlike = await db.Likes.create({
            user_id, post_id
        });
        console.log(newlike);
        res.status(200).json({
            status: "success, newlike created",
            newlike
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "newlike catch error",
        });
    }
};

const deleteLike = async (req, res) => {
    try {
        const { post_id } = req.params;
        const user_id = req.body.user.id;
        const count = await db.Likes.count({ where: { user_id, post_id } });
        if (count === 0) {
            return res.status(404).json({
                status: "Like does not exists",
            });
        }
        await db.Likes.destroy({ where: { user_id, post_id } });
        res.status(200).json({
            status: "success, like deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "delete catch error",
        })
    }
};

const getAllLikes = async (req, res) => {
    try {
        const { post_id } = req.params;
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
            const likes = await db.Likes.findAll({
                where: { post_id }
            });
            return res.status(200).json({
                status: "Likes Found",
                likes
            });
        } else {
            return res.status(404).json({
                status: "User not authorized"
            });
        }
    } catch (err) {
        return res.status(404).json({
            status: "getAllLikes catch error"
        });
    }
}

module.exports = { newLike, deleteLike, getAllLikes };