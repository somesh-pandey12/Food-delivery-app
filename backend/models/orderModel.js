// File Location: backend/models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
    deliveryBoyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivery",
    default: null
},
deliveryStatus: {
    type: String,
    enum: ["Not Assigned", "Assigned", "Picked Up", "On the way", "Delivered"],
    default: "Not Assigned"
}
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;