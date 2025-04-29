import React from 'react'
import "../components/Todaygrade.style.css"
import { Container, Row, Col } from 'react-bootstrap'
import DayGrade from './DayGrade'
import TopdayUpDate from './TopdayUpDate'

const Todaygrade = () => {
  return (
    <Container className="today-grade">
    <Row >
      <Col xs={4} className='todaygrade'>
        <DayGrade/>
      </Col>
      <Col xs={8} className='todaygrade'>
        <TopdayUpDate />
      </Col>
    </Row>
    </Container>
  )
}

export default Todaygrade
