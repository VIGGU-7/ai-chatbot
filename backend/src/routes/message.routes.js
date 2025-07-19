import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
const router=Router()
router.post("/send",userMiddleware,sendMessage)

export default router;