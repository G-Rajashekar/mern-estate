import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const SignUp=async (req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,password:hashedPassword})
    try{
        await newUser.save();
        res.status(201).json("user added successfully")
    }
    catch(error){ 
       next(error)
    }
}

export const SignIn=async(req,res,next)=>{
    const {email,password}=req.body 
    try{
        const validUser=await User.findOne({email})
        if (!validUser){
            return next(errorHandler(404,"user not found"))
        }
        const validPassword=await bcryptjs.compareSync(password,validUser.password)
        if (!validPassword){
            return next(errorHandler(401,"Wrong Credentials"))
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_TOKEN)
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUser)
    }
    catch(error){
        next(error)
    }
}
