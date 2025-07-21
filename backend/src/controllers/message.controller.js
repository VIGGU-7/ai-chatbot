import { ai } from "./aiApiRequest.js";
import { Message } from "../models/message.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Session } from "../models/session.model.js";
import mongoose from "mongoose";

export const sendMessage = asyncHandler(async (req, res) => {
  const user = req.user;
  const { prompt } = req.body;
  let { sessionId } = req.params;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required"
    });
  }

  const promptResponse = await ai(prompt);

  if (
    promptResponse.trim() === "Server is busy" ||
    !promptResponse.trim() ||
    promptResponse.trim() === "Something went wrong"
  ) {
    return res.status(500).json({
      success: false,
      message: "Server is busy"
    });
  }

  // Check if message has code
  const resisCode = await ai(
    `Does the following message contain code? Reply with only one word: true or false.\n\n"${promptResponse}"`
  );
  const isCode = resisCode.toLowerCase().includes("true");

  // ✅ If no sessionId provided, create a new session
  if (!sessionId) {
    const title = await ai(`give title for ${prompt} in 40 characters or 5-10 words strictly`);
    const newSession = new Session({
      title,
      ownerId: user._id
    });
    await newSession.save();
    sessionId = newSession._id;
  }

  const newMessage = new Message({
    message: prompt,
    sessionId,
    isCode,
    Response: promptResponse
  });

  await newMessage.save();

  return res.status(201).json({
    success: true,
    newMessage,
    sessionId 
  });
});


export const getMessagesBysessionId=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const user=req.user
    if(!id){
        return res.status(400).json({
            message:"No id has been specified"
        })
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({
            message:"Invalid chat id"
        })
    }
    const session=await Session.findById(id)
    if(!session){
        return res.status(404).json({
            message:"No chat has been found"
        })
    }
    if(session.ownerId===new mongoose.Types.ObjectId(user._id)){
         return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const message=await Message.find({sessionId:id})
    res.status(200).json(message)
})
export const getsessionhistory=asyncHandler(async(req,res)=>{
 const user=req.user
 const sessionHistory=await Session.find({ownerId:user._id}).sort({ createdAt: -1 })
 res.status(200).json(sessionHistory)
})
export const searchSession = asyncHandler(async (req, res) => {
  const { q } = req.body;
  const user = req.user;

  const results = await Session.find({
    ownerId: user._id,
    title: { $regex: q, $options: 'i' }
  });

  res.status(200).json(results);
});
