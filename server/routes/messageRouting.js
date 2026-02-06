let express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { sendMessage, fetchMessage } = require('../controller/messageController');

const messageRouter = express.Router();

messageRouter.post('/',authMiddleware,sendMessage);

messageRouter.get('/:chatId',authMiddleware,fetchMessage);

module.exports = messageRouter;