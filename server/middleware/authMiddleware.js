const User = require('../models/userModel');
let jwt = require('jsonwebtoken');

const authMiddleware = async(req,res,next) =>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token)
        {
            return res.status(401).json({message: "No Token"});
        }
        const decode = jwt.verify(token,"JSON123456");
        
        const user = await User.findById(decode.id).select("-password");

        if(!user)
        {
            return res.status(401).json({message: "can't find the user"});
        }
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({err: "Server Error "})
    }
}

module.exports = authMiddleware;
