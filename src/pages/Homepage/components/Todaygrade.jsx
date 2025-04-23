import React from 'react'
import "../components/Todaygrade.style.css"
import { Container, Row, Col } from 'react-bootstrap'
import DayGrade from './DayGrade'
import TopdayUpDate from './TopdayUpDate'

const Todaygrade = () => {
  return (
    <Container className="today-grade">
    <Row >
      <Col className='todaygrade' sm={4} >
        <DayGrade/>
      </Col>
      <Col sm={8}>
        <TopdayUpDate/>
      </Col>
    </Row>
    </Container>
  )
}

export default Todaygrade
