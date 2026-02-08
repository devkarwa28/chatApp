import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatWindow from '../components/ChatWindow/ChatWindow'
import socket from '../socket'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'

const ChatPage = () => {
  const [messages,setMessages] = useState([]);
  const {user} = useAuth();
  const {selectedChat} = useChat();

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
  },[user]);

  useEffect(()=>{
    if(!selectedChat) return;
    socket.emit("join chat",selectedChat._id);
    console.log("Joined Chat:",selectedChat._id);
    setMessages([]);
  },[selectedChat])

  useEffect(()=>{
    socket.on("message recived",(newMessage) =>{
      if(selectedChat && newMessage.chat._id === selectedChat._id)
      {
        setMessages((prev)=>[...prev,newMessage]);
      }
    })
    return () =>{
      socket.off("message recived");
    }
  },[selectedChat])
  return (
    <section className='chat-page'>
        <Sidebar/>
        <ChatWindow messages={messages} setMessages={setMessages} />
    </section>
  )
}

export default ChatPage