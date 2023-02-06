const db = require("../utils/db");
const { DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

const Replies = sequelize.define('Replies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.TEXT('long'),
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports=Replies;