const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllUsers, getMe, searchUsers } = require('../controller/userController');

const userRouter = express.Router();

userRouter.get("/",authMiddleware, getAllUsers);

userRouter.get("/me",authMiddleware, getMe);

userRouter.get("/search",authMiddleware, searchUsers);

module.exports = userRouter;
