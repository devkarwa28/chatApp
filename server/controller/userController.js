let User = require('../models/userModel');

exports.getAllUsers = async(req,res) =>{
    try{
        const users = await User.find({_id: {$ne: req.user._id}}).select("-password")
        res.json(users);
    }
    catch(err){
        return res.status(500).json({message:"Server Error"})
    }
};

exports.getMe = async(req,res) =>{
    try{
        res.json(req.user);
    }
    catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}
exports.searchUsers = async(req,res) =>{
    try{
        const { query } = req.query;

        if(!query)
        {
            return res.status(401).json({message: "Searching Query is required"})
        }
        const users = await User.find({
            $and: [
                {_id: {$ne: req.user._id}},
                {
                    $or:[
                        {uname : {$regex: query, $options: "i"}},
                        {phone: {$regex: query, $options:"i"}},
                    ]
                }
            ]
        }).select("-password");
        res.json(users);

    }
    catch(err){
        return res.status(500).json({message: "Server Error"})
    }
}