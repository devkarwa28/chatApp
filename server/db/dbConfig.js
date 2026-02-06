let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chatApp")
.then(()=>{
console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log("Cannot Connect Database"+err)
});
module.exports = mongoose;