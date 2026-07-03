import deliveryModel from "../models/deliveryModel.js";
import orderModel from "../models/orderModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerDelivery = async (req, res) => {
    const { name, email, password, phone, vehicleNumber } = req.body;
    try {
        const exists = await deliveryModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Delivery partner already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDelivery = new deliveryModel({
            name, email, password: hashedPassword, phone, vehicleNumber
        });

        await newDelivery.save();
        res.json({ success: true, message: "Registered! Wait for admin approval." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error registering" });
    }
};

// Login delivery boy
const loginDelivery = async (req, res) => {
    const { email, password } = req.body;
    try {
        const deliveryBoy = await deliveryModel.findOne({ email });
        if (!deliveryBoy) {
            return res.json({ success: false, message: "Delivery partner doesn't exist" });
        }

        if (!deliveryBoy.isApproved) {
            return res.json({ success: false, message: "Account not approved by admin yet" });
        }

        const isMatch = await bcrypt.compare(password, deliveryBoy.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(deliveryBoy._id);
        res.json({ success: true, token, name: deliveryBoy.name });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error logging in" });
    }
};
const getAvailableOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ deliveryStatus: "Not Assigned", payment: true });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error fetching orders" });
    }
};

const acceptOrder = async (req, res) => {
    const { orderId, deliveryId } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (order.deliveryBoyId) {
            return res.json({ success: false, message: "Order already assigned to someone else" });
        }

        await orderModel.findByIdAndUpdate(orderId, {
            deliveryBoyId: deliveryId,
            deliveryStatus: "Assigned"
        });

        await deliveryModel.findByIdAndUpdate(deliveryId, { status: "busy" });

        res.json({ success: true, message: "Order accepted" });
    } catch (error) {
        res.json({ success: false, message: "Error accepting order" });
    }
};
const getMyOrders = async (req, res) => {
    const { deliveryId } = req.body;
    try {
        const orders = await orderModel.find({ deliveryBoyId: deliveryId });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

const updateDeliveryStatus = async (req, res) => {
    const { orderId, deliveryStatus, deliveryId } = req.body;
    try {
        await orderModel.findByIdAndUpdate(orderId, { deliveryStatus });

        if (deliveryStatus === "Delivered") {
            await orderModel.findByIdAndUpdate(orderId, { status: "Delivered" });
            await deliveryModel.findByIdAndUpdate(deliveryId, {
                status: "available",
                $inc: { totalDeliveries: 1 }
            });
        }

        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        res.json({ success: false, message: "Error updating status" });
    }
};

// Live location update
const updateLocation = async (req, res) => {
    const { deliveryId, lat, lng } = req.body;
    try {
        await deliveryModel.findByIdAndUpdate(deliveryId, {
            currentLocation: { lat, lng }
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
};

const getAllDelivery = async (req, res) => {
    try {
        const data = await deliveryModel.find({});
        res.json({ success: true, data });
    } catch (error) {
        res.json({ success: false, message: "Error fetching delivery partners" });
    }
};

const approveDelivery = async (req, res) => {
    try {
        await deliveryModel.findByIdAndUpdate(req.body.id, { isApproved: true });
        res.json({ success: true, message: "Delivery partner approved" });
    } catch (error) {
        res.json({ success: false, message: "Error approving delivery partner" });
    }
};

export {
    registerDelivery,
    loginDelivery,
    getAvailableOrders,
    acceptOrder,
    getMyOrders,
    updateDeliveryStatus,
    updateLocation,
    getAllDelivery,
    approveDelivery
};