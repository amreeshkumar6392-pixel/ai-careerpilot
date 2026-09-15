const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("========== AUTH CHECK ==========");
        console.log("Token exists:", !!token);
        console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

        if (!token) {
            console.log("AUTH ERROR: Token not provided");

            return res.status(401).json({
                message: "Token not provided."
            });
        }

        const isTokenBlacklisted = await tokenBlacklistModel.findOne({
            token
        });

        if (isTokenBlacklisted) {
            console.log("AUTH ERROR: Token is blacklisted");

            return res.status(401).json({
                message: "Token is invalid."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("JWT decoded successfully:", decoded);

        req.user = decoded;

        next();

    } catch (err) {
        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid token."
        });
    }
}

module.exports = { authUser };