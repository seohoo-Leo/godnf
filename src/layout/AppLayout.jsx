import React from 'react'
import { Outlet } from 'react-router-dom';
import AppFooter from '../common/components/AppFooter';
import AppHeader from '../common/components/AppHeader';
import "./AppLayout.style.css"

const AppLayout = () => {
        
    
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
