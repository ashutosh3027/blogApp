const db = require('../utils/db');
const { Op } = require("sequelize");

const newPost = async (req, res) => {
    try {
        const user_id = req.body.user.id;
        const { title, body } = req.body;
        const newPost = await db.Posts.create({
            title, body, user_id
        })
        console.log(newPost);
        return res.status(200).json({
            status: 'success, post created',
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'newPost catch error',
        });
    }
};

const editPost = async (req, res) => {
    try {
        const user_id = req.body.user.id;
        const { body, id } = req.body;
        const check_id = await db.Posts.findAll({ attributes: ['user_id'], where: { id } });
        if (user_id !== check_id[0].user_id) {
            return res.status(404).json({
                status: 'Unauthorized',
            });
        }
        await db.Posts.update({ body, updatedAt: db.Sequelize.literal("CURRENT_TIMESTAMP") }, { where: { id } });
        return res.status(200).json({
            status: 'success, post edited',
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'editPost catch error',
        });
    }
};

const getAllPost = async (req, res) => {
    try {
        const user_id = req.body.user.id;
        const followings = await db.Follows.findAll({
            attributes: ['user_id_following'],
            where: { user_id_follow: user_id }
        });
        let ids = [];
        for (let i = 0; i < followings.length; i++) {
            ids.push(followings[i].user_id_following);
        } ids.push(user_id);
        const posts = await db.Posts.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'fullname']
            }],
            where: {
                user_id: {
                    [Op.in]: ids
                }
            },
            order: [['updatedAt', 'DESC']]
        });
        console.log(posts);
        return res.status(200).json({
            status: 'success, posts found',
            posts,
            user_id
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'getAllPost catch error',
        });
    }
};

const getPost = async (req, res) => {
    try {
        const user_id = req.body.user.id;
        const { id } = req.params
        console.log(req.body);
        const post = await db.Posts.findOne({
            where: { id },
            order: [['updatedAt', 'DESC']]
        });
        console.log(post);
        if (!post) {
            return res.status(404).json({
                status: "Couldn't find such post",
            });
        }
        return res.status(200).json({
            status: 'success, posts found',
            post,
            user_id
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'getAllPost catch error',
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const user_id = req.body.user.id;
        const { id } = req.params;
        const check_id = await db.Posts.findAll({ where: { id, user_id } });
        if (user_id !== check_id[0].user_id) {
            return res.status(404).json({
                status: 'Unauthorized',
            });
        }
        await db.Posts.destroy({ where: { id } });
        return res.status(200).json({
            status: 'success, post deleted',
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'deletePosts catch error',
        });
    }
};

const getPostsById = async (req, res) => {
    try {
        const { id } = req.params;
        let check = Number(id) !== req.body.user.id;
        // console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥",id !== req.body.user.id,typeof id, typeof req.body.user.id,check)
        if(check){
            check = await db.Follows.findOne({
                where: { user_id_follow: req.body.user.id, user_id_following: id }
            });
        }
        if (check || Number(id) === req.body.user.id) {
            const posts = await db.Posts.findAll({
                include: [{
                    model: db.User,
                    attributes: ['id', 'fullname']
                }],
                where: {
                    user_id: id
                },
                order: [['updatedAt', 'DESC']]
            });
            return res.status(200).json({
                status: 'success, posts found',
                posts
            });
        }else{
            return res.status(404).json({
                status: 'user not authorized',
            });
        }
    } catch (err) {
        return res.status(404).json({
            status: 'getPostsById catch error',
        });
    }
}

module.exports = { newPost, editPost, getAllPost, deletePost, getPost, getPostsById };