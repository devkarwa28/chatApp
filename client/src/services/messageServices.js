import axios from "axios";


const  API = "http://localhost:5000/api"

export const fetchMessages = async (chatId, token) =>{
    const {data} = await axios.get(`${API}/message/${chatId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const sendMessages = async (content,chatId,token) =>{
    const {data} = await axios.post(`${API}/message`,{content,chatId},{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return data;
}