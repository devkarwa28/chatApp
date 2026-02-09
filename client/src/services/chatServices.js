import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const accessChat = async (userId, token) =>{
    const {data} = await axios.post(`${API_URL}/chats`,{userId},{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return data;
}