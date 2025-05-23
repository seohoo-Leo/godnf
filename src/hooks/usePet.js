import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchPet=async({serverId,characterId})=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/creature?serverId=${serverId}&characterId=${characterId}`)
    return res 
}


export const usePet=(serverId,characterId)=>{
    return useQuery({
        queryKey:['pet',serverId,characterId],
        queryFn : ()=>fetchPet({serverId,characterId}),
        select : (results) => results.data
    })

}