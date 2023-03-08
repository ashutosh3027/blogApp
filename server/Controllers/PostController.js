const db = require('../utils/db');

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
        const check_id = db.Posts.findAll({attributes: {user_id}, where: {id}});
        if(user_id!==check_id[0]){
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
        const posts = await db.Posts.findAll({
            where: { user_id },
            order: [['updatedAt', 'DESC']]
        });
        console.log(posts);
        return res.status(200).json({
            status: 'success, posts found',
            posts
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
        const { id } = req.body;
        const check_id = db.Posts.findAll({attributes: {user_id}, where: {id}});
        if(user_id!==check_id[0]){
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

module.exports = { newPost, editPost, getAllPost, deletePost };