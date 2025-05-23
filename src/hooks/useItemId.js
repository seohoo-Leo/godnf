import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchItemId=async(itemId)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/itemId?itemId=${itemId}`)
    return res

}

export const useItemId=(itemId)=>{
    return useQuery({
        queryKey : ['itemId',itemId],
        queryFn: ()=>fetchItemId(itemId),
        select: (results) => results.data
    })
}