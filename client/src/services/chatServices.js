import axios from "axios";
const API = "http://localhost:5000/api";

export const accessChat = async (userId, token) =>{
    const {data} = await axios.post(`${API}/chats`,{userId},{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return data;
}