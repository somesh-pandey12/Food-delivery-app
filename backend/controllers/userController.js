// File Location: backend/controllers/userController.js

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// 🔑 Function to create JWT Token
const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || "SUPER_SECRET_KEY_JWT_2026",
        { expiresIn: "7d" }
    );
};

// 🍪 Helper Function to Send Token
const sendTokenResponse = (
    user,
    statusCode,
    res
) => {

    const token =
        createToken(user._id);

    const cookieOptions = {
        expires:
            new Date(
                Date.now() +
                7 * 24 * 60 * 60 * 1000
            ),
        httpOnly: true,
        secure:
            process.env.NODE_ENV ===
            "production",
        sameSite:
            process.env.NODE_ENV ===
            "production"
                ? "none"
                : "lax"
    };

    // Remove password before response
    const userResponse =
        user.toObject();

    delete userResponse.password;

    res.status(statusCode)
        .cookie(
            "token",
            token,
            cookieOptions
        )
        .json({
            success: true,
            token,
            message:
                "Authentication successful",
            user: userResponse
        });
};

// 🔐 1. Login User
const loginUser = async (
    req,
    res
) => {

    const {
        email,
        password
    } = req.body;

    try {

        const user =
            await userModel.findOne({
                email
            });

        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User doesn't exist"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid credentials"
            });
        }

        sendTokenResponse(
            user,
            200,
            res
        );

    } catch (error) {

        console.error(
            "❌ Login Controller Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server Error"
        });
    }
};

// 📝 2. Register User
const registerUser = async (
    req,
    res
) => {

    const {
        name,
        email,
        password
    } = req.body;

    try {

        // Check Existing User
        const exists =
            await userModel.findOne({
                email
            });

        if (exists) {

            return res.status(400).json({
                success: false,
                message:
                    "User already exists"
            });
        }

        // Validate Email
        if (
            !validator.isEmail(
                email
            )
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid email address"
            });
        }

        // Validate Password
        if (
            password.length < 6
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please enter a strong password (minimum 6 characters)"
            });
        }

        // Hash Password
        const salt =
            await bcrypt.genSalt(
                10
            );

        const hashedPassword =
            await bcrypt.hash(
                password,
                salt
            );

        // Create User
        const newUser =
            new userModel({
                name,
                email,
                password:
                    hashedPassword
            });

        const user =
            await newUser.save();

        sendTokenResponse(
            user,
            201,
            res
        );

    } catch (error) {

        console.error(
            "❌ Registration Controller Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server Error"
        });
    }
};

// 🌐 3. Google OAuth Sign In / Sign Up
const googleAuth = async (
    req,
    res
) => {

    const {
        name,
        email
    } = req.body;

    try {

        // Check if user exists
        let user =
            await userModel.findOne({
                email
            });

        // Create new user if not exists
        if (!user) {

            // Random secure fallback password
            const randomPassword =
                Math.random()
                    .toString(36)
                    .slice(-8) +
                Date.now();

            const salt =
                await bcrypt.genSalt(
                    10
                );

            const hashedPassword =
                await bcrypt.hash(
                    randomPassword,
                    salt
                );

            user =
                new userModel({
                    name,
                    email,
                    password:
                        hashedPassword
                });

            await user.save();
        }

        // Send JWT Response
        sendTokenResponse(
            user,
            200,
            res
        );

    } catch (error) {

        console.log(
            "❌ Google Authentication Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Google Authentication Failed"
        });
    }
};

// 🚪 4. Logout User
const logoutUser = async (
    req,
    res
) => {

    res.cookie(
        "token",
        "none",
        {
            expires:
                new Date(
                    Date.now() + 5 * 1000
                ),
            httpOnly: true,
            secure:
                process.env.NODE_ENV ===
                "production",
            sameSite:
                process.env.NODE_ENV ===
                "production"
                    ? "none"
                    : "lax"
        }
    );

    res.status(200).json({
        success: true,
        message:
            "Logged out successfully"
    });
};

// 👤 5. Get User Profile

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });

    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ success: false, message: "Error fetching profile" });
    }
};

export {
    loginUser,
    registerUser,
    googleAuth,
    logoutUser,
    getUserProfile
};