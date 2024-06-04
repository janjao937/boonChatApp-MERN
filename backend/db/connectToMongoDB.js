import mongoose from "mongoose";

const connectToMongoDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connect to mongoDB");

    }catch(error){
        console.log("connect fail");
    }
}

export default connectToMongoDb;