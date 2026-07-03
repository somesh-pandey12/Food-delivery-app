import express from "express";
import { chatWithSomu } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.post("/message", chatWithSomu);

export default chatRouter;