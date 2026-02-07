import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatWindow from '../components/ChatWindow/ChatWindow'

const ChatPage = () => {
  return (
    <section className='chat-page'>
        <Sidebar/>
        <ChatWindow/>
    </section>
  )
}

export default ChatPage