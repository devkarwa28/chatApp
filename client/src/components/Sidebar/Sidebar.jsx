import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Search, User as UserIcon, MessageSquare } from 'lucide-react'
import sideStyles from './sidebar.module.css'
import { useAuth } from '../../context/AuthContext'
import { fetchUsers } from '../../services/userServices';
import { useChat } from '../../context/ChatContext';
import { accessChat } from '../../services/chatServices';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { setSelectedChat, chats, setChats, selectedChat } = useChat();

    const handleUserClick = async (userId) => {
        try {
            const chat = await accessChat(userId, user.token);
            if (!chats.find((c) => c._id === chat._id)) {
                setChats([chat, ...chats]);
            }
            setSelectedChat(chat)
        }
        catch (err) {
            console.log("can't access the chat", err)
        }
    }

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers(user.token)
                setUsers(data)
            }
            catch (err) {
                console.log("unable to load user", err)
            }
            finally {
                setLoading(false);
            }
        }
        if (user?.token) {
            loadUsers();
        }
    }, [user])

    const filteredUsers = users.filter(u => 
        u.uname.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className={sideStyles.sidebar}>
            <div className={sideStyles.header}>
                <div className={sideStyles.userProfile}>
                    <div className={sideStyles.mainAvatar}>
                        <UserIcon size={20} />
                    </div>
                    <div>
                        <h3>{user?.uname}</h3>
                        <p className={sideStyles.status}>Online</p>
                    </div>
                </div>
                <button className={sideStyles.logoutBtn} onClick={logout} title="Logout">
                    <LogOut size={20} />
                </button>
            </div>

            <div className={sideStyles.searchWrapper}>
                <div className={sideStyles.searchInputBox}>
                    <Search className={sideStyles.searchIcon} size={18} />
                    <input 
                        type="text" 
                        placeholder='Search users...' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={sideStyles.chat_list}>
                <div className={sideStyles.listTitle}>
                    <MessageSquare size={16} />
                    <span>Recent Chats</span>
                </div>
                
                <AnimatePresence>
                    {loading ? (
                        <div className={sideStyles.loading}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={sideStyles.skeletonItem} />
                            ))}
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <motion.p 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className={sideStyles.emptyState}
                        >
                            No users found
                        </motion.p>
                    ) : (
                        filteredUsers.map((u, index) => (
                            <motion.div
                                key={u._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleUserClick(u._id)}
                                className={`${sideStyles.user_item} ${selectedChat?.users?.some(cu => cu._id === u._id) ? sideStyles.activeItem : ''}`}
                            >
                                <div className={sideStyles.avatar}>
                                    {u.uname.charAt(0).toUpperCase()}
                                    <div className={sideStyles.onlineBadge} />
                                </div>
                                <div className={sideStyles.userInfo}>
                                    <p className={sideStyles.username}>{u.uname}</p>
                                    <p className={sideStyles.email}>{u.email}</p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </aside>
    )
}

export default Sidebar