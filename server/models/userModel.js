let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    uname:{
        type:String,
        required: true,
        trim: true,
    },
    email:{
        type : String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        sparse: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    avatar:{
        type: String,
        default: "",
    },
    isOnline:{
        type: Boolean,
        default: false,
    },

},{timestamps: true});

userSchema.pre("save",async function(){
    if(!this.isModified("password")) 
    return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User",userSchema);