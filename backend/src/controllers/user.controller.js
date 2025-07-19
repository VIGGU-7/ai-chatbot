import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import { cookieGen } from "../utils/cookiegen.js";

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const data={username,email,password}
  for(let x in data){
    if(!data[x]){
        return res.status(400).json({
        success: false,
        message: `${x} is required`, 
      });
    }
  }


  const userData = { username, email };

  for (let x in userData) {
    const existing = await User.findOne({ [x]: userData[x] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `${x} already exists`, 
      });
    }
  }

  if (password.length < 7) {
    return res.status(400).json({
      success: false,
      message: "Minimum 7 characters are required",
    });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User created successfully", 
  });
});

export const login=asyncHandler(async(req,res)=>{
const {email,password}=req.body
const data={email,password}
for(let x in data){
    if(!data[x]){
        return res.status(400).json({
            success:false,
            message:`${x} is required`
        })
    }
}
const user=await User.findOne({email:email})
if(!user){
    return res.status(401).json({
        success:false,
        message:`Invalid email or password`
    })
}
const isMatch=bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(401).json({
        success:false,
        message:`Invalid email or password`
    })
}
const cookie=cookieGen(user._id)
res.cookie("token",cookie,{
    maxAge:7*24*60*60*1000,
    httpOnly: true,
    secure:process.env.NODE_ENV==='production',
    sameSite:'strict'
})
return res.status(200).json({
    success:true,
    message:"Loggedin succesfully"
})
})

export const logout=asyncHandler(async(req,res)=>{
  return res.cookie("token","",{
    maxAge:0
  })
  return res.status(200).json({
    success:true,
    message:"Logout succesfull"
  })
})