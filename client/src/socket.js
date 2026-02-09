import {io} from "socket.io-client";

const socket = io("https://chatapp-meko.onrender.com",{autoConnect: false, transports:["websocket"],});

export default socket;