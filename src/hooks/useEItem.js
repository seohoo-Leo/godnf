import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchEItem=async(serverId,characterId)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/EItem?serverId=${serverId}&characterId=${characterId}`)
    return res

}

export const useEItem=(serverId,characterId)=>{
    return useQuery({
        queryKey : ['EItem',serverId,characterId],
        queryFn: ()=>fetchEItem(serverId,characterId),
        select: (results) => results.data.equipment
    })
}