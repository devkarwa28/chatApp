import axios from "axios";
const API = process.env.API;

export const accessChat = async (userId, token) =>{
    const {data} = await axios.post(`${API}/chats`,{userId},{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return data;
}