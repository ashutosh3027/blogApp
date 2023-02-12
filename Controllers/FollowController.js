const db = require('../utils/db');

const newFollow = async (req,res) => {
    try{
        const {user_id_follow,user_id_following} = req.body;
        const newfollow = await db.Follows.create({
            user_id_follow,user_id_following
        });
        console.log(newfollow);
        res.status(200).json({
            status: 'success, new follow created'
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: "newfollow catch error",
        });
    }
};

const unFollow = async (req,res) => {
    try{
        const {user_id_follow,user_id_following} = req.body;
        await db.Follows.destroy({where:{user_id_follow,user_id_following}});
        res.status(200).json({
            status: 'success, follow deleted'
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: "unfollow catch error",
        });
    }
};

const getFollows = async (req,res) => {
    try{
        const {user_id_follow} = req.body;
        const follows = await db.Follows.findAll({
            where: {user_id_follow},
            order: [['createdAt','DESC']]
        });
        res.status(200).json({
            status: 'success, follows found',
            follows
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: "getfollows catch error",
        });
    }
};

const getFollowings = async (req,res) => {
    try{
        const {user_id_following} = req.body;
        const followings = await db.Follows.findAll({
            where: {user_id_following},
            order: [['createdAt','DESC']]
        });
        res.status(200).json({
            status: 'success, follows found',
            followings
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            status: "getfollowings catch error",
        });
    }
};

module.exports = {newFollow,unFollow,getFollows,getFollowings};