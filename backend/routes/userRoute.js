const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    getLoginStatus,
    updateUser, updatePhoto
} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/register', registerUser).post('/login', loginUser);
router.get('/logout', logoutUser).get('/', protect, getUser).get('/status', getLoginStatus
);
router.patch('/update', protect, updateUser).patch('/update/photo', protect, updatePhoto);

module.exports = router;