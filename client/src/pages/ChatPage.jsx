import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatWindow from '../components/ChatWindow/ChatWindow'
import socket from '../socket'
import { useAuth } from '../context/AuthContext'

const ChatPage = () => {

  const {user} = useAuth();

  useEffect(()=>{
    if(!user || !user._id)return;
    console.log("Connecting socket")
    socket.connect();
    socket.emit("setup",user);
    socket.on("connected",()=>{
      console.log("WebSocket Connected Successfully")
    });
    return () =>{
      socket.disconnect();
    }
  },[user])

  return (
    <section className='chat-page'>
        <Sidebar/>
        <ChatWindow/>
    </section>
  )
}

export default ChatPage