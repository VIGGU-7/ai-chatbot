import { ai } from "./aiApiRequest.js";
import { Message } from "../models/message.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Session } from "../models/session.model.js";

export const sendMessage=asyncHandler(async(req,res)=>{
const user=req.user;
const {prompt}=req.body;
if(!prompt){
    return res.status(400).json({
        success:false,
        message:"Prompt is required"
    })
}
const promptResponse=await ai(prompt)
if(promptResponse.trim()==="Server is busy" || !promptResponse.trim() || promptResponse.trim()==="Something went wrong"){
    return res.status(500).json({
        success:false,
        message:"Server is busy"
    })
}
const title=await ai(`give title for ${prompt} in 40 characters or 5-10 words strcitly`)
const resisCode=await ai(`Does the following message contain code? Reply with only one word: true or false.\n\n"${promptResponse}"`)
const isCode=resisCode.toLowerCase().includes("true");

const newSession=new Session({
    title:title,
    ownerId:user._id
})
await newSession.save()
const newMessage=new Message({
    message:prompt,
    sessionId:newSession._id,
    isCode:isCode,
    Response:promptResponse
})
await newMessage.save()
 return res.status(201).json({
        success:true,
        newMessage
    })
})