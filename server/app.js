let express = require('express');
let http = require('http')
const {Server} = require('socket.io')
let cors = require('cors');
const AuthRouter = require('./routes/AuthRouting');
const userRouter = require('./routes/userRouting');
const chatRouter = require('./routes/chatRouting');
const messageRouter = require('./routes/messageRouting');
require('./db/dbConfig')

let app = express();
app.use(cors())
app.use(express.json());
app.use('/api/auth',AuthRouter)
app.use('/api/users',userRouter)
app.use('/api/chats',chatRouter)
app.use('/api/message',messageRouter)

const server = http.createServer(app);