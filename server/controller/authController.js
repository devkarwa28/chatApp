const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"7d"});
};

// Register Controller
exports.registerUser = async(req,res) =>{
    try{
        const {uname,email,phone,password} = req.body;
        if(!phone){
            return res.status(400).json({message: "Phone Is Required"});
        }
        const userExist = await User.findOne({$or: [{email}, {phone}]});

        if(userExist){
            res.status(400).json({message:"User Alerady exists"});
        }
        const user = await User.create({
            uname,email,phone,password
        });
        res.status(201).json({
            _id: user._id,
            uname : user.uname,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Server Error"})
    }
};

//Login Controller
exports.loginUser = async(req,res) =>{
    try{
        const {email,phone,password} = req.body;

        const user = await User.findOne({$or: [{email},{phone}]}).select("+password");
        
        if(!user || !password)
        {
            return res.status(401).json({message : "invalid Crendentials"})
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Credential"})
        }
        res.json({
            _id: user._id,
            uname: user.uname,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};