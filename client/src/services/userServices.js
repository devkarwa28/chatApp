import axios from "axios";

const API_URl = process.env.API;

export const fetchUsers = async(token) =>{
    const {data} = await axios.get(`${API_URl}/users`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
    return data;
};