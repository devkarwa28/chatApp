
let express = require('express');
let http = require('http')
const {Server} = require('socket.io')
let cors = require('cors');
const AuthRouter = require('./routes/AuthRouting');
const userRouter = require('./routes/userRouting');
const chatRouter = require('./routes/chatRouting');
const messageRouter = require('./routes/messageRouting');
const { Socket } = require('dgram');
require('./db/dbConfig')

let app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET","POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "token"]
  })
);
app.use(express.json());
app.use('/api/auth',AuthRouter)
app.use('/api/users',userRouter)
app.use('/api/chats',chatRouter)
app.use('/api/message',messageRouter)

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: process.env.CLIENT_URL,
        methods: ["GET","POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "token"]
    },
});

console.log("Socket IO inizilized")
io.on("connection",(socket)=>{
    console.log("NEW Client connected:",socket.id);

    socket.on("setup",(userData)=>{
       if(!userData || !userData._id)
       {
        console.log("socket setup called without  valid  user data");
        return;
       }
       socket.join(userData._id);
       socket.emit("connected");
       console.log("user Joined personal room:",userData._id);
    })

    socket.on("join chat",(chatId)=>{
        socket.join(chatId)
        console.log("User Joined Chat:",chatId);
    })

    socket.on("new message",(message)=>{
        const chat = message.chat;
        if(!chat || !chat._id) return;
        socket.to(chat._id).emit("message got",message);
        console.log("Message emited to chat:",chat._id)
    })
    socket.on("typing",(chatId) =>{
        socket.to(chatId).emit("typing", chatId);
    })
    socket.on("stop typing",(chatId)=>{
        socket.to(chatId).emit("stop typing", chatId);
    })
    socket.on("disconnect",()=>{
        console.log("Client Disconnected:",socket.id)
    });

});
const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("Server started on  PORT:",PORT)
})