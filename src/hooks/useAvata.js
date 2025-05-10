import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchAvata=async({serverId,characterId})=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/avata?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const useAvata=(serverId,characterId)=>{
    return useQuery({
        queryKey:['avata',serverId,characterId],
        queryFn : ()=>fetchAvata({serverId,characterId}),
        select : (results) => results.data
    })

}