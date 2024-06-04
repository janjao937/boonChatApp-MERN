import jwt from "jsonwebtoken";

const generateTokenAndSetCookie=(userId,res)=>
{
    //cli for gen jwtSecret openssl rand -base64 32

    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });

    //key,value,option
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//day*hr*min*sec*ms
        httpOnly:true,//prevent XSS attack cross-site script attack
        sameSite:"strict",//CSRF attacks cross-site request forgery attack 
        secure:process.env.NODE_ENV!=="development" //if develop return false if true it will be secure for (https)
    });

}


export default generateTokenAndSetCookie;