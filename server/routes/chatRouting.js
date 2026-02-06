let express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { accessChat, fetchChats } = require('../controller/chatController');

let chatRouter = express.Router();

chatRouter.post('/',authMiddleware,accessChat);
chatRouter.get('/',authMiddleware,fetchChats);

module.exports = chatRouter;
