import { Router } from "express";
import { login,logout,signup,userauthsession } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
const router=Router()
router.post("/login",login)
router.post("/signup",signup)
router.get("/logout",userMiddleware,logout)
router.get("/check",userMiddleware,userauthsession)
export default router;