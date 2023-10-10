const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401);
            throw new Error('Not Authorized')
        }

        //verify token
        const verifiedToken = jwt.verify(token, process.env["JWT_SECRET"]);
        const user = await User.findById(verifiedToken.id).select('-password');
        if (!user) {
            res.status(401);
            throw new Error('User not found')
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401);
        throw new Error('Not Authorized')
    }
})
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized only admin can access');
    }
}
module.exports = {
    protect,
    adminOnly
}