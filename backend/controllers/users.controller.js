import User from "../model/user.model.js";

export const getUserForSidebar = async(req,res)=>{
    try
    {
        const logInUserId = req.user.id;
        const filterUser = await User.find({_id:{$ne:logInUserId}}).select("-password");//$ne = not equal  .select is array function on js
        res.status(200).json(filterUser);
    }
    catch(error)
    {
        console.log("Error in getUserForSidebar|"+error.message);
        res.status(400).json({error:"Internal server error"});
    }
}