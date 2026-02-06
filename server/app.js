let express = require('express');
let cors = require('cors');
const AuthRouter = require('./routes/AuthRouting');
const userRouter = require('./routes/userRouting');
const chatRouter = require('./routes/chatRouting');
require('./db/dbConfig')

let app = express();
app.use(cors())
app.use(express.json());
app.use('/api/auth',AuthRouter)
app.use('/api/users',userRouter)
app.use('/api/chats',chatRouter)

app.listen(5000,()=>{
console.log("Server Started on Port No. 5000")
});