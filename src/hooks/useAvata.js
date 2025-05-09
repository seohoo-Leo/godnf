import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchAvata=async({serverId,characterId})=>{
    const res = await axios.get(`/api/avata?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const useAvata=(serverId,characterId)=>{
    return useQuery({
        queryKey:['avata',serverId,characterId],
        queryFn : ()=>fetchAvata({serverId,characterId}),
        select : (results) => results.data
    })

}