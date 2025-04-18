import React from 'react'
import { useServers } from '../hooks/useServers'

const AppLayout = () => {

    const {data,isLoading} = useServers();  
    console.log(data.serverName);

    if(isLoading) return <p>서버 목록 불러오는 중 .....</p>
    
  return (
    <div>
      
    </div>
  )
}

export default AppLayout
