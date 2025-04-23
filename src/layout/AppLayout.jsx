import React from 'react'
import { useServers } from '../hooks/useServers'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    
    const {data, isLoding, IsError} = useServers();

    
    if(isLoding){
        <p> Loding ..... </p>
    }

    
    
  return (
    <div>
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">
      <div style={{
        width:"200px",
        height:"50px",
        overflow:"hidden",
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        borderRadius:"16px"
      }}>
          <img style={{
              width: "180px",
              height:"auto",
              objectFit: "cover",
              objectPosition: "center center", }}
              src='/img/logoDNF.png'/>
        </div>
        </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="">캐릭터 검색</Nav.Link>
        <Nav.Link href="#features">아이템 검색</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
   <Outlet/>
   </div>
  )
}

export default AppLayout
