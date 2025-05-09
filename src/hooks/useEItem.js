import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchEItem=async(serverId,characterId)=>{
    const res = await axios.get(`https://dnf-server.onrender.com/api/EItem?serverId=${serverId}&characterId=${characterId}`)
    return res

}

export const useEItem=(serverId,characterId)=>{
    return useQuery({
        queryKey : ['EItem',serverId,characterId],
        queryFn: ()=>fetchEItem(serverId,characterId),
        select: (results) => results.data.equipment
    })
}