import { useQuery } from "@tanstack/react-query"
import { dnfApi } from "../utils/api";
import axios from "axios";



const fetchServers=async()=>{
 const res= await axios.get('http://localhost:3001/api/servers');
 return res.data.rows
}

export const useServers = () =>{
    return useQuery({
        queryKey:['servers'],
        queryFn :()=> fetchServers() 
    })
}