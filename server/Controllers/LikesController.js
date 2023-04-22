const db = require('../utils/db');

const newLike = async (req,res) => {
    try{
        const {post_id}=req.body;
        const user_id = req.body.user.id;
        const count = await db.Likes.count({where:{user_id,post_id}});
        if(count!==0){
            return res.status(404).json({
                status: "Like already exists",
            });
        }
        const newlike = await db.Likes.create({
            user_id,post_id
        });
        console.log(newlike);
        res.status(200).json({
            status: "success, newlike created"
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: "newlike catch error",
        });
    }
};

const deleteLike = async (req,res) => {
    try{
        const {post_id}=req.params;
        const user_id = req.body.user.id;
        const count = await db.Likes.count({where:{user_id,post_id}});
        if(count===0){
            return res.status(404).json({
                status: "Like does not exists",
            });
        }
        await db.Likes.destroy({where:{user_id,post_id}});
        res.status(200).json({
            status: "success, like deleted"
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: "delete catch error",
        })
    }
};

module.exports = {newLike,deleteLike};