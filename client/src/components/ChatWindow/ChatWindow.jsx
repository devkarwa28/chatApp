import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ChevronLeft, MoreVertical, Paperclip, Smile, MessageCircle } from 'lucide-react'
import windowStyles from "./chatwindow.module.css"
import { useChat } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext';
import { sendMessages } from '../../services/messageServices';
import socket from '../../socket';


const ChatWindow = ({ messages, setMessages, isTyping }) => {
    const { selectedChat, setSelectedChat } = useChat();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef();
    let typingTimeout;

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessages = async () => {
        if (!newMessage.trim() || !selectedChat) return;
        try {
            const msg = await sendMessages(
                newMessage,
                selectedChat._id,
                user.token
            );
            setMessages((prev) => [...prev, msg]);
            socket.emit("new message", msg)
            setNewMessage("");
            socket.emit("stop typing", selectedChat._id);
        }
        catch (err) {
            console.log("Cannot send the message", err)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessages();
        }
    };

    if (!selectedChat) {
        return (
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={windowStyles.emptyWindow}
            >
                <div className={windowStyles.emptyContent}>
                    <div className={windowStyles.emptyIcon}>
                        <MessageCircle size={48} />
                    </div>
                    <h2>Your Messages</h2>
                    <p>Select a chat to start messaging and stay connected with your friends.</p>
                </div>
            </motion.section>
        )
    }

    const chatName = selectedChat.users
        ?.filter((u) => u._id !== user._id)
        .map((u) => u.uname)
        .join(", ");

    return (
        <section className={windowStyles.window}>
            <div className={windowStyles.header}>
                <div className={windowStyles.headerLeft}>
                    <button className={windowStyles.backBtn} onClick={() => setSelectedChat(null)}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className={windowStyles.chatAvatar}>
                        {chatName?.charAt(0).toUpperCase()}
                    </div>
                    <div className={windowStyles.chatInfo}>
                        <h3>{chatName}</h3>
                        <p className={windowStyles.onlineStatus}>
                            {isTyping ? "typing..." : "Online"}
                        </p>
                    </div>
                </div>
                <div className={windowStyles.headerRight}>
                    <button className={windowStyles.iconBtn}><MoreVertical size={20} /></button>
                </div>
            </div>

            <div className={windowStyles.messages}>
                <AnimatePresence initial={false}>
                    {messages.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={windowStyles.noMessages}
                        >
                            <p>Send a message to start the conversation</p>
                        </motion.div>
                    ) : (
                        messages.map((msg, index) => (
                            <motion.div
                                key={msg._id || index}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={msg.sender._id === user._id ? windowStyles.myMessageWrapper : windowStyles.otherMessageWrapper}
                            >
                                <div className={msg.sender._id === user._id ? windowStyles.myMessage : windowStyles.otherMessage}>
                                    <p>{msg.content}</p>
                                    <span className={windowStyles.timestamp}>
                                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
                <div ref={scrollRef} />
            </div>

            <div className={windowStyles.inputArea}>
                <div className={windowStyles.inputContainer}>
                    <button className={windowStyles.accessoryBtn}><Smile size={22} /></button>
                    <button className={windowStyles.accessoryBtn}><Paperclip size={22} /></button>
                    <input
                        type="text"
                        placeholder='Type a message...'
                        value={newMessage}
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                            socket.emit("typing", selectedChat._id);
                            if (typingTimeout) clearTimeout(typingTimeout);
                            typingTimeout = setTimeout(() => {
                                socket.emit("stop typing", selectedChat._id);
                            }, 3000);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={windowStyles.sendBtn} 
                        onClick={handleSendMessages}
                        disabled={!newMessage.trim()}
                    >
                        <Send size={20} />
                    </motion.button>
                </div>
            </div>
        </section>
    )
}

export default ChatWindow;