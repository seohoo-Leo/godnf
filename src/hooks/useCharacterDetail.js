import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchCharacter=async(serverId,characterId)=>{
    const res = await axios.get(`http://localhost:3001/api/characters/details?serverId=${serverId}&characterId=${characterId}`)
    return res
}


export const useCharacterDetail=(serverId,characterId)=>{
    return useQuery({
        queryKey:['character',serverId,characterId],
        queryFn : ()=>fetchCharacter(serverId,characterId),
        select : (results) => results.data
    })

}