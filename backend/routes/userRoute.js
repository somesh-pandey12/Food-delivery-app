// File Location: backend/routes/userRoute.js

import express from "express";
import { 
    loginUser, 
    registerUser, 
    googleAuth, 
    logoutUser, 
    getUserProfile 
} from "../controllers/userController.js"; 
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// 📬 Authentication Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleAuth);
userRouter.post("/logout", logoutUser);

// 👤 Protected Profiles Access Node 
userRouter.get("/me", authMiddleware, getUserProfile); // Fixed hook placement here

export default userRouter;