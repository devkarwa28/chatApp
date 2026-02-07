import React from 'react'
import sideStyles from './sidebar.module.css'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
    const {user, logout} = useAuth();
  return (
    <aside className={sideStyles.sidebar}>
        <div className={sideStyles.header}>
            <h3>{user?.uname}</h3>
            <button onClick={logout}>
                Logout
            </button>
        </div>
        <div className={sideStyles.search}>
            <input type="text" placeholder='Search Chat'/>
        </div>
        <div className={sideStyles.chat_list}>
            <p>No Chats Yet</p>
        </div>

    </aside>
  )
}

export default Sidebar