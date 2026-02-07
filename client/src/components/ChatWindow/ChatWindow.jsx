import React from 'react'
import windowStyles from "./chatwindow.module.css"
const ChatWindow = () => {
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

export default ChatWindow