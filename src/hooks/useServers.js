import { useQuery } from "@tanstack/react-query"
import axios from "axios";



const fetchServers=async()=>{
 const res= await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/servers`);
 return res.data.rows
}

export const useServers = () =>{
    return useQuery({
        queryKey:['servers'],
        queryFn :()=> fetchServers() 
    })
}