import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchItemId=async(itemId)=>{
    const res = await axios.get(`http://localhost:3001/api/itemId?itemId=${itemId}`)
    return res

}

export const useItemId=(itemId)=>{
    return useQuery({
        queryKey : ['itemId',itemId],
        queryFn: ()=>fetchItemId(itemId),
        select: (results) => results.data
    })
}