console.log("server file started")
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
    origin: "http://localhost:3000",
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
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "token"]
    },
});
const PORT = 5000;
console.log("Socket IO inizilized")
io.on("connection",(Socket)=>{
    console.log("NEW Client connected:",Socket.id);

    Socket.on("setup",(userData)=>{
       if(!userData || !userData._id)
       {
        console.log("Socket setup called without  valid  user data");
        return;
       }
       Socket.join(userData._id);
       Socket.emit("connected");
       console.log("user Joined personal room:",userData._id);
    })

    Socket.on("join chat",(chatId)=>{
        Socket.join(chatId)
        console.log("User Joined Chat:",chatId);
    })

    Socket.on("new message",(message)=>{
        const chat = message.chat;
        if(!chat.users) return;

        chat.users.forEach((user)=>{
            if(user._id === message.sender._id) return;
            Socket.to(user._id).emit("message recived", message);

        });
    })
    Socket.on("disconnect",()=>{
        console.log("Client Disconnected:",Socket.id)
    });

});

server.listen(PORT,()=>{
    console.log("Server started on  PORT:",PORT)
})