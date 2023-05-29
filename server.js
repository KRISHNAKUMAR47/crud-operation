const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config()
const nocache = require("nocache")
const app=express()

DB=process.env.DBURL
mongoose.connect(DB)

const connection=mongoose.connection
connection.once("open",()=>{console.log("connection successfully")});

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json())
app.use(nocache())


//for user routes
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

//for admin routes
const adminRoute = require('./routes/adminRoute');

app.use('/admin',adminRoute);

app.listen(3000,function(){
    console.log("server is running");
})