import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


const AppHeader = () => {
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
    </div>
  )
}

export default AppHeader
