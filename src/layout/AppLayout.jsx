import React from 'react'
import { useServers } from '../hooks/useServers'

const AppLayout = () => {

    const {data} = useServers();
    console.log(data);
    
  return (
    <div>
      
    </div>
  )
}

export default AppLayout
