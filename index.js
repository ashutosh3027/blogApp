const db = require("./utils/db");
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const userRoute = require('./Routes/userRoute');

app.use(cors()); // for corss platform use of api
app.use(express.json()) // for paresing the body parameters.
app.use('/api/v1/user',userRoute); 


if(process.env.NODE_ENV=="development"){
   app.use(morgan("dev"));
}


const PORT = process.env.PORT ||8000;
const server = app.listen(PORT, ()=>{
    console.log(`Server Listing on port ${PORT}`);
})
