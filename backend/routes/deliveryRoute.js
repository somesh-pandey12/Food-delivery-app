import express from "express";
import {
    registerDelivery,
    loginDelivery,
    getAvailableOrders,
    acceptOrder,
    getMyOrders,
    updateDeliveryStatus,
    updateLocation,
    getAllDelivery,
    approveDelivery
} from "../controllers/deliveryController.js";
import deliveryAuth from "../middleware/deliveryAuth.js";

const deliveryRouter = express.Router();

// Public routes
deliveryRouter.post("/register", registerDelivery);
deliveryRouter.post("/login", loginDelivery);

deliveryRouter.get("/all", getAllDelivery);
deliveryRouter.post("/approve", approveDelivery);
deliveryRouter.get("/available-orders", deliveryAuth, getAvailableOrders);
deliveryRouter.post("/accept-order", deliveryAuth, acceptOrder);
deliveryRouter.post("/my-orders", deliveryAuth, getMyOrders);
deliveryRouter.post("/update-status", deliveryAuth, updateDeliveryStatus);
deliveryRouter.post("/update-location", deliveryAuth, updateLocation);

export default deliveryRouter;