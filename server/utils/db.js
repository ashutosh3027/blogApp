const mysql = require('mysql2');
const config = require("./config")
const Sequelize = require('sequelize');
var db = {};
const initialize = async () => {
    const { host, port, user, password, database } = config.database;
    console.log("Test config:",host, port, user, password, database)
    const pool = mysql.createPool({ host, port, user, password });
    pool.query(`CREATE DATABASE IF NOT  EXISTS ${database};`, async (err, res) => {
        if (err) throw err;
        console.log(res);
        const sequelize = new Sequelize(database, user, password, {
            host, port,
            dialect: "mysql",
            pool:{
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            }
        });
        sequelize.authenticate().then((err) => {
            if (err) throw err;
            console.log("Authenticated!!");
        });
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        const User = require('../Models/User');
        const Replies = require('../Models/Replies');
        const Posts = require('../Models/Posts');
        const Likes = require('../Models/Likes');
        const Follows = require('../Models/Follows');
        const Comments = require('../Models/Comments');
        User.hasMany(Posts, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        Posts.belongsTo(User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        User.hasMany(Likes, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        Likes.belongsTo(User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        User.hasMany(Comments, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        Comments.belongsTo(User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        User.hasMany(Replies, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        Replies.belongsTo(User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        Comments.hasMany(Replies, {
            foreignKey: 'comment_id',
            sourceKey: 'id'
        });
        Replies.belongsTo(Comments, {
            foreignKey: 'comment_id',
            targetKey: 'id'
        });
        Posts.hasMany(Likes, {
            foreignKey: 'post_id',
            sourceKey: 'id'
        });
        Likes.belongsTo(Posts, {
            foreignKey: 'post_id',
            targetKey: 'id'
        });
        Posts.hasMany(Comments, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        Comments.belongsTo(Posts, {
            foreignKey: 'post_id',
            targetKey: 'id'
        });
        User.hasMany(Follows, {
            foreignKey: 'user_id_follow',
            sourceKey: 'id'
        });
        Follows.belongsTo(User, {
            foreignKey: 'user_id_follow',
            targetKey: 'id',
            as: 'follows_user'
        });
        User.hasMany(Follows, {
            foreignKey: 'user_id_following',
            sourceKey: 'id'
        });
        Follows.belongsTo(User, {
            foreignKey: 'user_id_following',
            targetKey: 'id',
            as: 'followings_user'
        });
        await sequelize.sync();
        db.User = User;
        db.Replies = Replies;
        db.Posts = Posts;
        db.Likes = Likes;
        db.Follows = Follows;
        db.Comments = Comments;
    });
}

initialize();

module.exports = db;