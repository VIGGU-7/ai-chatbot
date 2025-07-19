import mongoose, { Schema,model } from "mongoose";
const messageSchema=new Schema({
    message:{
        type:String,
        required:true
    },
    sessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Session",
        required:true,
    },
    isCode:Boolean,
    Response:{
         type:String,
        required:true
    }
})

export const Message=model("Message",messageSchema)