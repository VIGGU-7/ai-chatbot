import cookieParser from 'cookie-parser'
import express from 'express'
import { connectDB } from './utils/connectDB.js'
import authRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'
import 'dotenv/config'
import cors from 'cors'
const app=express()
app.use(cors({
 origin:"http://localhost:5173",
 credentials:true
}))
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({limit:'10mb'}))
app.use(cookieParser())

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack); 

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong"
  });
});


//routes
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)




const port=process.env.PORT
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})