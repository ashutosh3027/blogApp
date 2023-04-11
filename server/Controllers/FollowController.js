const db = require('../utils/db');

const newFollow = async (req,res) => {
    try{
        const {user_id_following} = req.body;
        const user_id_follow = req.body.user.id;
        if(user_id_follow===user_id_following){
            return res.status(404).json({
                status: "Can't follow yourself"
            });
        }
        const count1 = await db.User.count({where:{id:user_id_following}});
        if(count1===0){
            return res.status(404).json({
                status: "user does not exist",
            });
        }
        const count = await db.Follows.count({where:{user_id_follow,user_id_following}});
        if(count!==0){
            return res.status(404).json({
                status: "follow already exists",
            });
        }
        const newfollow = await db.Follows.create({
            user_id_follow,user_id_following
        });
        console.log(newfollow);
        return res.status(200).json({
            status: 'success, new follow created'
        });
    }catch(err){
        console.log(err);
        return res.status(404).json({
            status: "newfollow catch error",
        });
    }
};

const unFollow = async (req,res) => {
    try{
        const user_id_following = req.params.id;
        const user_id_follow = req.body.user.id;
        const count1 = await db.User.count({where:{id:user_id_following}});
        if(count1===0){
            return res.status(404).json({
                status: "user does not exist",
            });
        }
        const count = await db.Follows.count({where:{user_id_follow,user_id_following}});
        if(count===0){
            return res.status(404).json({
                status: "follow does not exists",
            });
        }
        await db.Follows.destroy({where:{user_id_follow,user_id_following}});
        return res.status(200).json({
            status: 'success, follow deleted'
        });
    }catch(err){
        console.log(err);
        return res.status(404).json({
            status: "unfollow catch error",
        });
    }
};

const getFollows = async (req,res) => {
    try{
        const user_id_follow = req.body.user.id;
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
        const user_id_following = req.body.user.id;
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

const getFollowsById = async (req,res) => {
    try{
        const user_id_following = req.params.id;
        const check = await db.Follows.findOne({where: {user_id_following,user_id_follow: req.body.user.id }});
        console.log(check);
        if(check){
            const follows = await db.Follows.findAll({
                where: {user_id_follow: user_id_following},
                order: [['createdAt','DESC']]
            });
            res.status(200).json({
                status: 'success, follows found',
                follows
            });
        }else{
            const count = await db.Follows.count({where:{user_id_follow: user_id_following}});
            res.status(200).json({
                status: 'success, follows count found',
                count
            });
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: "getfollowsbyid catch error",
        });
    }
}

const getFollowingsById = async (req,res) => {
    try{
        const user_id_following = req.params.id;
        const check = await db.Follows.findOne({where: {user_id_following,user_id_follow: req.body.user.id }});
        if(check){
            const followings = await db.Follows.findAll({
                where: {user_id_following},
                order: [['createdAt','DESC']]
            });
            res.status(200).json({
                status: 'success, followings found',
                followings
            });
        }else{
            const count = await db.Follows.count({where:{user_id_following}});
            res.status(200).json({
                status: 'success, followings count found',
                count
            });
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: "getfollowsbyid catch error",
        });
    }
}

module.exports = {newFollow,unFollow,getFollows,getFollowings,getFollowsById,getFollowingsById};