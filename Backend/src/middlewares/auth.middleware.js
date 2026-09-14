const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")



async function authUser(req, res, next) {
    const token = req.cookies.token

    console.log("Token exists:", !!token)
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET)

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log("JWT decoded successfully:", decoded)

        req.user = decoded
        next()

    } catch (err) {
        console.log("JWT ERROR:", err.message)

        return res.status(401).json({
            message: "Invalid token."
        })
    }
}


module.exports = { authUser }