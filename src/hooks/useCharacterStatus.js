import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchCharacterStatus=async(serverId,characterId)=>{
    const res = await axios.get(`/api/characters/status?serverId=${serverId}&characterId=${characterId}`)
    return res
}


export const useCharacterStatus=(serverId,characterId)=>{
    return useQuery({
        queryKey:['status',serverId,characterId],
        queryFn : ()=>fetchCharacterStatus(serverId,characterId),
        select : (results) => results.data
    })

}