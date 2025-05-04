import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const ItemCard = () => {
  return (
    <Container>
        <Row>
            <Col>아이템 사진</Col>
            <Col>아이템 이름 </Col>
            <Col>판매가격</Col>
            <Col></Col>
        </Row>
        <Row>
            <Col>1</Col>
            <Col>1</Col>
            <Col>1</Col>
            <Col>1</Col>
        </Row>
    </Container>
  )
}

export default ItemCard
