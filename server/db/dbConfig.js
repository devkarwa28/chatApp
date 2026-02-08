let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("MongoDB Connected Successfully");
})
.catch((err)=>{
    console.log("MongoDB Connection error:"+err)
});
module.exports = mongoose;