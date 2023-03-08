const db = require('../utils/db');

const newComment = async (req,res)=>{
    try{
        const {message,post_id}=req.body;
        const user_id = req.body.user.id;
        const count = await db.Posts.count({where:{id:post_id}});
        if(count===0){
            return res.status(404).json({
                stauts: 'invalid post_id',
            });
        }
        const newcomment = await db.Comments.create({
            message,user_id,post_id
        });
        res.status(200).json({
            stauts: 'success, new comment created',
            newcomment
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            stauts: 'newComment catch error',
        });
    }
};

const editComment = async (req,res)=>{
    try{
        const {id,message}=req.body;
        const user_id = req.body.user.id;
        const comments = await db.Comments.findAll({where:{id}});
        if(comments[0].user_id!==user_id){
            return res.status(404).json({
                status: "Unauthorized"
            });
        }
        await db.Comments.update({ message, updatedAt: db.Sequelize.literal("CURRENT_TIMESTAMP") },{where:{id}});
        res.status(200).json({
            stauts: 'success, comment edited',
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            stauts: 'editComment catch error',
        });
    }
};

const getAllComments = async (req, res) => {
    try {
        const {post_id} = req.body;
        const comments = await db.Comments.findAll({
            where: { post_id },
            order: [['updatedAt', 'DESC']]
        });
        console.log(comments);
        return res.status(200).json({
            status: 'success, comments found',
            comments
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'getAllComments catch error',
        });
    }
};

module.exports = {newComment,editComment,getAllComments}