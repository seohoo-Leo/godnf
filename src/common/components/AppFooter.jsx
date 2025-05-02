import React from 'react'
import { Container,Row, Col } from 'react-bootstrap'

const AppFooter = () => {
  return (
    <Container className="footer">
      <Row className='info'>
        <Col className='logo'>  
        <a href="http://developers.neople.co.kr" target="_blank">
        <img src="./img/neopleLogo.png" alt="Neople 오픈 API"
             style={{ height: "60px"}} /> </a>
        </Col>
        <Col className='right'>Copyright© goDNF All rights reserved</Col>
    
      </Row>
    </Container>
    
  )
}

export default AppFooter
