const config = require('mysql2');
const config = require("./config")
const Sequelize = require('sequelize');
module.export = db={};
const initialize = async ()=>{
    const {host, port, user, password, database}= config.database;
    const pool = mysql.createPool({host, port, user, password});
    pool.query(`CREATE DATABASE IF NOT  EXISTS ${database};`, async(err, res)=>{
        if(err) throw err;
        console.log(res);
        const sequelize = new Sequelize(database, user, password, {
            host, port,
            dialect:"mysql",
            pool:{
                max:config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            }
        });
        sequelize.authenticate().then((err)=>{
            if(err) throw err;
            console.log("Authenticated!!");
        });
        db.sequelize= sequelize;
        
    })
}