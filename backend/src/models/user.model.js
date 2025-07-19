import { Schema } from "mongoose";
import { model } from "mongoose";
const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unqiue:true,
        trim:true,
        lowercase:true,
        required:[true,"Email is required"],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        minlength:[7,"7 characters are must required in password"]
    }
},{timestamps:true})

export const User=model("User",userSchema)