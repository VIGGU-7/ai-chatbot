import mongoose, { connect, mongo } from 'mongoose'
import asyncHandler from './asyncHandler.js'
import 'dotenv/config'
export const connectDB=async()=>{
    try {
            const dbResponse=await mongoose.connect(process.env.MONGO_URI)
    const connection=dbResponse.connection;
    connection.on("connected",()=>{ 
        console.log("Database has been connected to host "+connection.host)
    }
    )
    connection.on("disconnected",()=>{
        console.log("Disconnected to database")
        process.exit(1)
    }
    )
    } catch (error) {
        console.log("error while connecting to database")
        process.exit(1)
    }

}
