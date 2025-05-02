import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import "./Auction.style.css";


const Auction = () => {
  return (<div>
    <Container className='auction'>
        <Row className='total_box'>
            <Row className="search"> 검색창 </Row>
            <Row className="search_result"> 검색결과창</Row>
        </Row>
    </Container>
  </div>
  );
}

export default Auction
