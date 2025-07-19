import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'
export const userMiddleware=asyncHandler(async(req,res,next)=>{
const {token}=req.cookies
if(!token){
    return res.status(401).json({
        success:false,
        message:"No auth token has been provided"
    })
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
const user=await User.findById(decoded.id).select("-password")
if(!user){
    return res.status(401).json({
        success:false,
        message:"No user found authenticated"
    })
}
req.user=user;
next();
})