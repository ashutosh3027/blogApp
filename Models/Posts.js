const db = require("../utils/db");
const { DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

const Posts = sequelize.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT('long'),
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    }
  }, {timestamps: false,});

module.exports = Posts;