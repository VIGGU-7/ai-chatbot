import { Router } from "express";
import { getMessagesBysessionId, sendMessage } from "../controllers/message.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
const router=Router()
router.post("/send",userMiddleware,sendMessage)
router.post("/send/:sessionId",userMiddleware,sendMessage)
router.get("/chat/:id",userMiddleware,getMessagesBysessionId)
export default router;