import axios from "axios";

const API_URl = "http://localhost:5000/api";

export const fetchUsers = async(token) =>{
    const {data} = await axios.get(`${API_URl}/users`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
    return data;
};