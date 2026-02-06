const Chat = require('../models/chatModel')
const User = require('../models/userModel')

exports.accessChat = async (req,res) =>{
    const {userId} = req.body;
    if(!userId)
    {
        return res.status(400).json({message: "UserId is required"});
    }
    try{
        let chat = await Chat.findOne({isGroupChat: false, users:{$all:[req.user._id,userId]},}).populate("users","-password");
        if(chat)
        {
            return res.json(chat)
        }

        const newChatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };

        const newChat = await Chat.create(newChatData);
        const fullChat = await Chat.findById(newChat._id).populate("users","-password");

        return res.status(201).json(fullChat)
    }
    catch(err){
        return res.status(500).json({message: "Server Error"})
    }
}

exports.fetchChats = async(req,res) =>{
    try{
        let chats = await Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
        .populate("users","-password").populate("groupAdmin","-password")
        .sort({updatedAt: -1});

        res.json(chats);
    }
    catch(err){
        return res.status(500).json({message: "Server Error"})
    }
}