import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchTalisman=async({serverId,characterId})=>{
    const res = await axios.get(`https://dnf-server.onrender.com/api/talisman?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const useTalisman=(serverId,characterId)=>{
    return useQuery({
        queryKey:['talisman',serverId,characterId],
        queryFn : ()=>fetchTalisman({serverId,characterId}),
        select : (results) => results.data
    })

}