import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchCharacterStatus=async(serverId,characterId)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/character/status?serverId=${serverId}&characterId=${characterId}`)
    return res
}


export const useCharacterStatus=(serverId,characterId)=>{
    return useQuery({
        queryKey:['status',serverId,characterId],
        queryFn : ()=>fetchCharacterStatus(serverId,characterId),
        select : (results) => results.data
    })

}