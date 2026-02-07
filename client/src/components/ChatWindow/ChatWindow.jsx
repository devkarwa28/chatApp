import React, { useEffect, useState } from 'react'
import windowStyles from "./chatwindow.module.css"
import { useChat } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext';
import { fetchMessages } from '../../services/messageServices';


const ChatWindow = () => {

    const {selectedChat} = useChat();
    const{user} = useAuth();
    const [messages,setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(!selectedChat){
            setMessages([]);
            return;
        }
        const loadMessages = async () =>{
            try{
                setLoading(true);
                const data = await fetchMessages(selectedChat._id,user.token);
                setMessages(data)
            }
            catch(err){
                console.log("Failed to get message")
            }
            finally{
                setLoading(false);
            }
        }
        loadMessages();
    },[selectedChat,user.token]);

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
                loading ? (<p>Loading Messages</p>) : messages.length === 0 ?(<p>No messages</p>) :
                (
                    messages.map((msg) => (
                        <div key={msg._id} className={msg.sender._id === user._id ? windowStyles.myMessage : windowStyles.otherMessage}>
                            <p>{msg.content}</p>
                        </div>
                    ))
                )
            }
        </div>
        <div className={windowStyles.inputBox}>
            <input type="text" placeholder='Type message' />
            <button>Send</button>
        </div>
    </section>
  )
}

export default ChatWindow