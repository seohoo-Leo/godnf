import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchItemName=async(itemName,rarity)=>{
    const res = await axios.get(`/api/itemName?itemName=${itemName}&rarity=${rarity}`)
    return res

}

export const useItemName=(itemName,rarity)=>{
    return useQuery({
        queryKey : ['itemName',itemName,rarity],
        queryFn: ()=>fetchItemName(itemName,rarity),
        select: (results) => results.data
    })
}