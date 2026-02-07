import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        try{
            const userInfo = localStorage.getItem("userInfo");
        if(userInfo)
        {
            setUser(JSON.parse(userInfo))
        }
        }
        catch(err){
            localStorage.removeItem("userInfo")
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    },[]);

    const logout = () =>{
        localStorage.removeItem("userInfo");
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{user,setUser,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)