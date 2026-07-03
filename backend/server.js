import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

// Import Routes
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatRouter from "./routes/chatRoute.js";
import deliveryRouter from "./routes/deliveryRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(",") 
  : ["http://localhost:5173", "http://localhost:5174", "https://food-verse-mern-app.vercel.app"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"] 
}));
app.use(express.json());
app.use(cookieParser());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});


connectDB();
app.use("/images", express.static(path.join(__dirname, "uploads")));

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chat", chatRouter);
app.use("/api/delivery", deliveryRouter);


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ Socket Connected:", socket.id);
  socket.on("disconnect", () => console.log("❌ Socket Disconnected"));
});

httpServer.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});