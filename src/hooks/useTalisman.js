import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchTalisman=async({serverId,characterId})=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/talisman?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const useTalisman=(serverId,characterId)=>{
    return useQuery({
        queryKey:['talisman',serverId,characterId],
        queryFn : ()=>fetchTalisman({serverId,characterId}),
        select : (results) => results.data
    })

}