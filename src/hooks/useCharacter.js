import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchCharacter=async({serverId,characterName})=>{
    const res = await axios.get(`http://localhost:3001/api/characters?serverId=${serverId}&characterName=${characterName}`)
    return res
}


export const useCharacter=(serverId,characterName)=>{
    return useQuery({
        queryKey:['character',serverId,characterName],
        queryFn : ()=>fetchCharacter({serverId,characterName}),
        select : (results) => results.data
    })

}