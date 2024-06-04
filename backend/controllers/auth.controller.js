import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateJWToken.js";


export const signup = async(req,res)=>{
    try{
        const {fullname,username,password,confirmPassword,gender} = req.body;

        if(confirmPassword!== password)
            {
                return res.status.json({error:"Password don't match"});
            }

        const user = await User.findOne({username});
        if(user)
            {
                return res.status(400).json({error:"Username already exists"});
            }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        //randomPic api | https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const newUser = await User({
            fullname:fullname,
            username:username,
            password:hashPassword,
            gender:gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic
        });

        if(newUser)
        {
            generateTokenAndSetCookie(newUser.id,res);
            await newUser.save();
            res.status(201).json({
                id:newUser.id,
                username:newUser.username,
                fullname:newUser.fullname,
                profilePic:newUser.profilePic});
        }
        else
        {
            res.status(400).json({error:"Invalid user data"});
        }



    }catch(err)
    {
        console.log("Error in signup controller");
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login = async(req,res)=>{
   try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");
    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid username or password"});
    }
    generateTokenAndSetCookie(user.id,res);//setcookie
    // console.log("login: "+user.username);

    res.status(201).json({
        id:user.id,
        username:user.username,
        fullname:user.fullname,
        profilePic:user.profilePic});

   }
   catch(err)
    {
        console.log("Error in login controller");
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout = (req,res)=>{
   try
   {
        res.cookie("jwt","",{maxAge:0});//clear cookie
        res.status(200).json({message:"logout success"});
   }
   catch(error)
   {
    console.log("Error in login controller");
    res.status(500).json({error:"Internal Server Error"});
   }
}