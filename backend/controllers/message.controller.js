import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>
    {
        try
        {
            const {message} = req.body;
            const {id:receiverId} = req.params;//change variable name to receiverId(shot hand)
            const senderId = req.user.id
           
            let conversation = await Conversation.findOne({
                participants:{$all:[senderId,receiverId]}//$all = all data sortby senderId and reciverId
            });

            if(!conversation)
            {
                conversation = await Conversation.create({
                    participants:[senderId,receiverId]
                });
            }
            const newMessage = new Message({
                senderId,receiverId,message
            });
            if(newMessage){
                conversation.message.push(newMessage.id);
            }
            // await conversation.save();
            // await newMessage.save();
            await Promise.all([conversation.save(),newMessage.save()]);//run in parallel
            //socket io function for realTime

            const receiverSocketId = getReceverSocketId(receiverId);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage);//io.to(<socketId>).emit() use to send events to specific client
            }


            res.status(201).json(newMessage);
        }
        catch(error)
        {
            console.log("error in sendMessage controller"+error.message);
            res.status(500).json({error:"Internal Server Error"});
        }
    }

export const getMessages =async(req,res)=>{
    try
    {           //change variable name to userToChatId(shot hand)
        const {id:userToChatId} = req.params;
        const senderId = req.user.id;
        const conversation = await Conversation.findOne({

            participants:{$all:[senderId,userToChatId]}

        }).populate("message");//populate("key") function is get data from Message table "message" is keyName of Message Table on Conversation table (get message by Conversation Model)

        if(!conversation)return res.status(200).json([]);

      
            
        res.status(200).json(conversation.message);
    }
    catch(error)
    {
        console.log("error in sendMessage controller"+error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
} 