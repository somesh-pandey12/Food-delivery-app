import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["available", "busy", "offline"],
        default: "offline"
    },
    // Live location
    currentLocation: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    totalDeliveries: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: Boolean,
        default: false 
    }
}, { minimize: false, timestamps: true });

const deliveryModel = mongoose.models.delivery || mongoose.model("delivery", deliverySchema);

export default deliveryModel;