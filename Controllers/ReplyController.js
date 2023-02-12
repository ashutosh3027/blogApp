const db = require('../utils/db');

const newReply = async (req,res)=>{
    try{
        const {message,user_id,comment_id}=req.body;
        const newreply = await db.Replies.create({
            message,user_id,comment_id
        });console.log(newreply);
        res.status(200).json({
            stauts: 'success, new Reply created',
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            stauts: 'newComment Reply error',
        });
    }
};

const editReply = async (req,res)=>{
    try{
        const {id,message}=req.body;
        await db.Replies.update({ message, updatedAt: db.Sequelize.literal("CURRENT_TIMESTAMP") },{where:{id}});
        res.status(200).json({
            stauts: 'success, Reply edited',
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            stauts: 'editReply catch error',
        });
    }
};

const getAllReplies = async (req, res) => {
    try {
        const {comment_id} = req.body;
        const replies = await db.Replies.findAll({
            where: { comment_id },
            order: [['updatedAt', 'DESC']]
        });
        console.log(replies);
        return res.status(200).json({
            status: 'success, replies found',
            replies
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            status: 'getAllReplies catch error',
        });
    }
};

module.exports = {newReply,editReply,getAllReplies}