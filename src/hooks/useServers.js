import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const fetchServers=async()=>{
 const res= await axios.get('/.netlify/functions/getServers');
 return res.data
}

export const useServers = () =>{
    return useQuery({
        queryKey:['servers'],
        queryFn : fetchServers
    })
}