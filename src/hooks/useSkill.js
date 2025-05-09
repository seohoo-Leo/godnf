import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchSkill=async({serverId,characterId,jobId})=>{
    const res = await axios.get(`https://dnf-server.onrender.com/api/skill?serverId=${serverId}&characterId=${characterId}&jobId=${jobId}`)
    return res 
}


export const useSkill=(serverId,characterId,jobId)=>{
    return useQuery({
        queryKey:['skill',serverId,characterId,jobId],
        queryFn : ()=>fetchSkill({serverId,characterId,jobId}),
        select : (results) => results.data
    })

}