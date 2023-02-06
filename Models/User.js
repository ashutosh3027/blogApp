// import { Sequelize, Model, DataTypes } from 'sequelize';
// import { sequelize } from 'sequelize';
const db = require("../utils/db");
const { DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

// const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  confirm_password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;