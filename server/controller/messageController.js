let Message = require('../models/messageModel');
let Chat = require('../models/chatModel');

exports.sendMessage = async (req,res) =>{
    const {content, chatId} = req.body;
    if(!content || !chatId)
    {
        return res.status(400).json({message: "Content and ChatID is required"})
    }
    try{
        let message = await Message.create({
            sender: req.user._id,
            content,
            chat: chatId,
        })
        message = await message.populate("sender","uname email");
        message = await message.populate("chat");
        await Chat.findByIdAndUpdate(chatId,{latestMessage: message._id});
        res.status(201).json(message)
    }
    catch(err){
        return res.status(500).json({message: "Server Error"})
    }
}

exports.fetchMessage = async (req,res)=>{
    const {chatId} = req.params;
    try{
        const message = await Message.find({chat: chatId}).populate("sender","uname email").populate("chat").sort({createdAt: 1});

        res.json(message);
    }
    catch(err){
        return res.status(500).json({message: "Server Error"})
    }
}