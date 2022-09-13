const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const userRouter = require('./routes/users')
const exerciseRouter = require('./routes/exercises')
const loginRouter = require('./routes/login')
require("dotenv").config();

const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 8888;
const uri = process.env.DATABSE_URI
app.use(cors());
app.use('/exercises',exerciseRouter)
app.use('/users',userRouter)
app.use('/login', loginRouter)

mongoose.connect(uri,{useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open',()=>{
    console.log("Connected to database successfully")
})


app.listen(port, () => {
  console.log("Server is running on port", port);
});
