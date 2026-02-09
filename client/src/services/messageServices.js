import axios from "axios";


const  API_URL = process.env.API_URL;

export const fetchMessages = async (chatId, token) =>{
    const {data} = await axios.get(`${API_URL}/message/${chatId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const sendMessages = async (content,chatId,token) =>{
    const {data} = await axios.post(`${API_URL}/message`,{content,chatId},{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return data;
}