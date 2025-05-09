import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchBuff=async({serverId,characterId})=>{
    const res = await axios.get(`/api/buff?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const useBuff=(serverId,characterId)=>{
    return useQuery({
        queryKey:['buff',serverId,characterId],
        queryFn : ()=>fetchBuff({serverId,characterId}),
        select : (results) => results.data
    })

}