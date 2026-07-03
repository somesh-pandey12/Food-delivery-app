// File Location: backend/middleware/auth.js

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    let token;

    // 1️⃣ Check Token From Cookies (Primary secure entry channel)
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // 2️⃣ Check Authorization Header (Bearer token format for Postman/Admin)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.headers.token) {
        token = req.headers.token;
    }

    if (!token || token === "none" || token === "null" || token === "undefined") {
        return res.status(401).json({
            success: false,
            message: "Not Authorized, Login Again!"
        });
    }

    try {
        // ✅ Verify Token
        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET || "SUPER_SECRET_KEY_JWT_2026"
        );
        req.userId = token_decode.id;
        if (req.body) {
            req.body.userId = token_decode.id;
        }

        next();

    } catch (error) {
        console.error("❌ Auth Middleware Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired."
        });
    }
};

export default authMiddleware;