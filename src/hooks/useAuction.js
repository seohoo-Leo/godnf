import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchAuction=async({itemName,rarity})=>{
    const res = await axios.get(`http://localhost:3001/api/auction?itemName=${itemName}&rarity=${rarity}`)
    return res 
}


export const useAuction=(itemName,rarity)=>{
    return useQuery({
        queryKey:['auction',itemName,rarity],
        queryFn : ()=>fetchAuction({itemName,rarity}),
        select : (results) => results.data
    })

}