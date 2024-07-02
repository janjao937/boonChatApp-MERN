// const express = require("express");
// const dotenv = require("dotenv");
import path from "path";
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

const __dirname = path.resolve();

app.use(express.json());//json payload from req.body
app.use(cookieParser());//parse data in cookie from req

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);
app.use("/api/users",userRoute);

//https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname,"/frontend/dist")));//share file(img,sound,video,etc.) in Folder between frontend and backend //dist จะถูกสร้างตอน build ใน frontend

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));//middleware to frontend file
})


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