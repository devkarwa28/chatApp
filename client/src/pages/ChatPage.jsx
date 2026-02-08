import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatWindow from '../components/ChatWindow/ChatWindow'
import socket from '../socket'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'
import { fetchMessages } from '../services/messageServices'

const ChatPage = () => {
  const [messages,setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const {user} = useAuth();
  const {selectedChat} = useChat();

  useEffect(()=>{
    if(!user?._id) return;
    if(!socket.connected){
      socket.connect();
      socket.emit("setup",user);
    }
    return () =>{
      socket.off("connected");
    }
  },[user]);

  useEffect(()=>{
    if(!selectedChat) return;
    socket.emit("join chat",selectedChat._id);
    console.log("Joined Chat:",selectedChat._id);
  },[selectedChat])

  useEffect(()=>{
   const handleNewMessage = (newMessage) => {
    if(!selectedChat) return;
    if(newMessage.chat._id !== selectedChat._id)
    {
      return;
    }

    setMessages((prev)=>{
      if(prev.find((m)=> m._id === newMessage._id)) return prev;
      return[...prev, newMessage];
    });
  };
    socket.on("message got", handleNewMessage);

    return () =>{
      socket.off("message got", handleNewMessage)
    };
   
  },[selectedChat])

  useEffect(()=>{
    if(!selectedChat) return;

    const loadMessages = async () =>{
      const data = await fetchMessages(selectedChat._id, user.token);
    setMessages(data);
    socket.emit("join chat",selectedChat._id);
    console.log("Joined Chat:", selectedChat._id);
    };
    loadMessages();
  },[selectedChat]);

  useEffect(()=>{
    socket.on("typing",()=>{
      setIsTyping(true);
    })
    socket.on("stop typing",()=>{
      setIsTyping(false);
    })
    return () =>{
      socket.off("typing");
      socket.off("stop typing");
    }
  },[])

  return (
    <section className='chat-page'>
        <Sidebar/>
        <ChatWindow messages={messages} setMessages={setMessages} isTyping={isTyping} />
    </section>
  )
}

export default ChatPage