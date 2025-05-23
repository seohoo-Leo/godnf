import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchTimeLine=async({serverId,characterId})=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/timeline?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const useTimeLine=(serverId,characterId)=>{
    return useQuery({
        queryKey:['timeline',serverId,characterId],
        queryFn : ()=>fetchTimeLine({serverId,characterId}),
        select : (results) => results.data
    })

}