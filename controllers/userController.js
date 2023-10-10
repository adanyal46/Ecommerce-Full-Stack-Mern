const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const {add} = require("nodemon/lib/rules");

const generateToken = (id) => {
    return jwt.sign({id}, process.env["JWT_SECRET"], {
        expiresIn: '1d'
    })
}

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all required fields');
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error('Password must be up to 6 characters');
    }
    //check if user exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
        res.status(400);
        throw new Error('Email has already been registered');
    }

    //create a new user
    const user = await User.create({
        name, email, password
    })
    const token = generateToken(user._id);
    if (user) {
        const {_id, name, email, role} = user;
        res.cookie('token', token, {
            path: '/', httpOnly: true, expires: new Date(Date.now() + 1000 * 86400), // secure: true,
            // sameSite: true,
        });
        res.status(200).json({
            message: 'Register Successfully', _id, name, email, role, token
        })

    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password is required');
    }
    //check if user exist
    const user = await User.findOne({email});
    console.log(user)
    if (user) {
        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        if (passwordIsCorrect) {
            const token = generateToken(user._id);
            res.cookie('token', token, {
                path: '/', httpOnly: true, expires: new Date(Date.now() + 1000 * 86400), // secure: true,
                // sameSite: none,
            });

            // Respond with a success message and the user data (excluding password)
            const newUser = user.toObject(); // Convert to a plain JavaScript object
            delete newUser.password; // Remove the password field
            res.json({
                message: 'Login Successfully', user: newUser
            });
        } else {
            res.status(400);
            throw new Error('Invalid email or password');
        }
    } else {
        // User does not exist
        res.status(400);
        throw new Error('User not found');
    }
})
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', "", {
        path: '/', httpOnly: true, expires: new Date(0),
    })
    res.status(200).json({
        message: 'Logout Successfully',
    })
})
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(400);
        throw new Error('User not found')
    }
})
const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json(false)
    }

    const verifiedToken = await jwt.verify(token, process.env["JWT_SECRET"]);
    if (verifiedToken) {
        res.json(true)
    } else {
        res.json(false)
    }
})
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        const {name, phone, address} = user;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

        const updateUser = await user.save();
        res.status(200).json(updateUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})
const updatePhoto = asyncHandler(async (req, res) => {
    const {photo} = req.body
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        user.photo = photo;
        const updateUser = await user.save();
        res.status(200).json(updateUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})
module.exports = {
    registerUser, loginUser, logoutUser, getUser, getLoginStatus, updateUser, updatePhoto
}