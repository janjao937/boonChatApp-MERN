import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ],
    message:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true});//createdAt updateAt

const Conversation = mongoose.model("Conversation",conversationSchema);

export default Conversation; 