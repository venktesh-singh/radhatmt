const express= require("express");
const app = express();
path = require('path');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use(express.static(path.join(__dirname, 'public')));
// for the db 
const connectDB = require('./db/connection')
connectDB();

// for the route 
const router =require("./router")
app.use("/api",router)

const corsOptions ={
    origin:'http://localhost:3000', 
    // credentials:true,            //access-control-allow-credentials:true
    // optionSuccessStatus:200
}
app.use(cors(corsOptions));
 
app.use('/uploads', express.static('uploads'));
app.listen(PORT,()=>{
console.log(`server runing ${PORT}`);
})