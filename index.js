const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const env = require('dotenv').config();
const db = require("./utils/db");
const cookieParser = require('cookie-parser');
const userRoute = require('./Routes/userRoute');
const postRoute = require('./Routes/postRoute');
const commentRoute = require('./Routes/commentRoute');
const replyRoute = require('./Routes/replyRoute');
const likesRoute = require('./Routes/likesRoute');
const followRoute = require('./Routes/followRoute');

app.use(cors()); // for corss platform use of api
app.use(express.json()) // for paresing the body parameters.
app.use(cookieParser()) // cookie parser middleware
app.use('/api/v1/user',userRoute);
app.use('/api/v1/post',postRoute); 
app.use('/api/v1/comment',commentRoute);
app.use('/api/v1/reply',replyRoute);
app.use('/api/v1/likes',likesRoute);
app.use('/api/v1/follow',followRoute);

if(process.env.NODE_ENV=="development"){
   app.use(morgan("dev"));
}


const PORT = process.env.PORT ||8000;
const server = app.listen(PORT, ()=>{
    console.log(`Server Listing on port ${PORT}`);
})
