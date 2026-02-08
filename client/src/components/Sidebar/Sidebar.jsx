import React, { useEffect, useState } from 'react'
import sideStyles from './sidebar.module.css'
import { useAuth } from '../../context/AuthContext'
import { fetchUsers } from '../../services/userServices';
import { useChat } from '../../context/ChatContext';
import { accessChat } from '../../services/chatServices';

const Sidebar = () => {
    const {user, logout} = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedChat ,chats, setChats} = useChat();
    const handleUserClick = async (userId) =>{
        try{
            const chat = await accessChat(userId,user.token);

            if(!chats.find((c)=>c._id === chat._id))
            {
                setChats([chat,...chats]);
            }
            setSelectedChat(chat)
        }
        catch(err){
            console.log("can't access the chat",err)
        }
    }
    useEffect(()=>{
        const loadUsers = async () =>{
            try{
                const data = await fetchUsers(user.token)
                setUsers(data)
            }
            catch(err){
                console.log("unable to load user",err)
            }
            finally{
                setLoading(false);
            }
        }
        if(user?.token)
        {
            loadUsers();
        }

    },[user])

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
           {
            loading ? (
                <p> Loading Users</p>
            ) : users.length === 0 ?(
                <p>No Users found</p>
            ):(
                users.map((u)=>(
                    <div key={u._id} onClick={()=>handleUserClick(u._id)} className={sideStyles.user_item}>
                        <div className={sideStyles.avatar}>
                            {u.uname.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className={sideStyles.username}>{u.uname}</p>
                            <p className={sideStyles.email}>{u.email}</p>
                        </div>
                    </div>
                ))
            )
           }
        </div>

    </aside>
  )
}

export default Sidebar