import mongoose, { Schema,model } from "mongoose";
const sessionSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true})

export const Session=model("Session",sessionSchema)