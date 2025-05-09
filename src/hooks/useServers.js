import { useQuery } from "@tanstack/react-query"
import axios from "axios";



const fetchServers=async()=>{
 const res= await axios.get('https://dnf-server.onrender.com/api/servers');
 return res.data.rows
}

export const useServers = () =>{
    return useQuery({
        queryKey:['servers'],
        queryFn :()=> fetchServers() 
    })
}