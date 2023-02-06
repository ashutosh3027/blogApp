const db = require("../utils/db");
const { DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

const Follows = sequelize.define('Follows',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id_follow: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id_following: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = Follows;