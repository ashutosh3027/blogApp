module.exports={
    "database":{
        "host":"localhost",
        "port":3306,
        "user":process.env.DATABASE_USER||"root",
        "password":process.env.PASSWORD,
        "database":"blogApp"
    },
    "pool":{
        "max":5,
        "min":0,
        "acquire":30000,
        "idle":10000
    }
}