import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const cookieGen=(id)=>{
if(!id){
    console.log("No id has been specified")
}
const token=jwt.sign({id},process.env.JWT_SECRET)
return token;
}