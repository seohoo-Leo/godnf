import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchAuction=async({itemId,rarity})=>{
    const res = await axios.get(`https://dnf-server.onrender.com/api/auction?itemId=${itemId}&rarity=${rarity}`)
    return res 
}


export const useAuction=(itemId,rarity)=>{
    return useQuery({
        queryKey:['auction',itemId,rarity],
        queryFn : ()=>fetchAuction({itemId,rarity}),
        select : (results) => results.data
    })

}