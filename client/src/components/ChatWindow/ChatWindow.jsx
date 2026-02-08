import React, { useState } from 'react'
import windowStyles from "./chatwindow.module.css"
import { useChat } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext';
import { sendMessages } from '../../services/messageServices';
import socket from '../../socket';


const ChatWindow = ({messages, setMessages, isTyping}) => {

    const {selectedChat} = useChat();
    const{user} = useAuth();
    const [newMessage, setNewMessage] = useState("")
    let typingTimeout;
    

    

    const handleSendMessages = async () =>{
        if(!newMessage.trim() || !selectedChat) return;
        try{
            const msg = await sendMessages(
                newMessage,
                selectedChat._id,
                user.token
            );
            setMessages((prev)=>[...prev, msg]);
            socket.emit("new message",msg)
            setNewMessage("");
        }
        catch(err){
            console.log("Cannot send the message",err)
        }
    }

    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessages();
    }
  };

  if(!selectedChat)
  {
    return (
    <section className={windowStyles.window}>
        <div className={windowStyles.header}>
            <h3>Select Chat</h3>
        </div>
        <div className={windowStyles.messages}>
            <p>No Messages</p>
        </div>
        <div className={windowStyles.inputBox}>
            <input type="text" placeholder='Type message......' disabled />
            <button disabled>Send</button>
        </div>
    </section>
  )
  }

  return(
    <section className={windowStyles.window}>
        <div className={windowStyles.header}>
            <h3>
                {
                    selectedChat.users
                    ?.filter((u)=>u._id !== user._id)
                    .map((u)=>u.uname)
                    .join(", ")
                }
            </h3>
        </div>
        <div className={windowStyles.messages}>
            {
                messages.length === 0 ?(<p>No messages</p>) :
                (
                    messages.map((msg) => (
                        <div key={msg._id} className={msg.sender._id === user._id ? windowStyles.myMessage : windowStyles.otherMessage}>
                            <p>{msg.content}</p>
                        </div>
                    ))
                )
            }
            {
                isTyping && (<p style={{fontStyle:'italic', color:"grey"}}>Typing....</p>)
            }
        </div>
        <div className={windowStyles.inputBox}>
            <input type="text" placeholder='Type message' value={newMessage} onChange={(e)=>{
                setNewMessage(e.target.value);
                socket.emit("typing",selectedChat._id);
                if(typingTimeout) clearTimeout(typingTimeout);
                typingTimeout = setTimeout(()=>{
                    socket.emit("stop typing",selectedChat._id);
                },2000);
                
                }} onKeyDown={handleKeyDown} />
            <button onClick={handleSendMessages}>Send</button>
        </div>
    </section>
  )
}

export default ChatWindow;