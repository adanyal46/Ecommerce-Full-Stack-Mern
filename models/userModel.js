const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {ObjectId} = mongoose.Schema;
const useSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be up to 6 characters']
    },
    role: {
        type: String,
        required: [true],
        default: 'customer',
        enum: ['customer', 'admin']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required'],
        default: 'https://i.ibb.co/4pDNDk1/avatar.png'
    },
    phone: {
        type: String,
        default: '+234',
    },
    address: {
        type: Object,
    }
}, {
    timeStamp: true,
})

useSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next();
})
const User = mongoose.model('User', useSchema);
module.exports = User;