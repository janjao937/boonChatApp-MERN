import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    gender:{
        type:String,
        require:true,
        enum:["male","female"]
    },profilePic:
    {
        type:String,
        default:"",
    },
},{timestamps:true});//option timestamps => createdAt updateAt

const User = mongoose.model("User",userSchema);

export default User;