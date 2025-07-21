import { Router } from "express";
import { getMessagesBysessionId, getsessionhistory, sendMessage } from "../controllers/message.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
const router=Router()
router.post("/send",userMiddleware,sendMessage)
router.post("/send/:sessionId",userMiddleware,sendMessage)
router.get("/chat/:id",userMiddleware,getMessagesBysessionId)
router.get("/history",userMiddleware,getsessionhistory)
export default router;