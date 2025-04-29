import React from 'react'
import { useServers } from '../hooks/useServers'
import Container from 'react-bootstrap/Container';

import { Outlet, useNavigate } from 'react-router-dom';
import AppFooter from '../common/components/AppFooter';
import AppHeader from '../common/components/AppHeader';

const AppLayout = () => {
    
    const {data, isLoding, IsError} = useServers();

    
    if(isLoding){
        <p> Loading ..... </p>
    }

    
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader />
    
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        
        <AppFooter />
    </div>
  )
}

export default AppLayout
