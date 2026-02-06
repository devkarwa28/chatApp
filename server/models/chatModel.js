let mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    chatname:{
        type: String,
        trim:true,
    },
    isGroupChat:{
        type:Boolean,
        default: false,
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

},{timestamps: true,})

module.exports = mongoose.model("Chat",chatSchema);