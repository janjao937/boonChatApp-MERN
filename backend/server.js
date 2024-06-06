// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import connectToMongoDb from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/users.route.js";

import {app,server} from "./socket/socket.js";
// const app = express();
dotenv.config();

const PORT = process.env.PORT||5000;

app.use(express.json());//json payload from req.body
app.use(cookieParser());//parse data in cookie from req

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);
app.use("/api/users",userRoute);







server.listen(PORT,()=>{
    connectToMongoDb();
    console.log("server is running on port "+PORT);
});

// app.get("/",(req,res)=>{
//     //root route http://localhost:PORT
    
//     // res.send("Hello world");
//     res.status(200).json({messgae:"Hello Banana"});
//     // res.status(200).send("Hello Banana");
// })