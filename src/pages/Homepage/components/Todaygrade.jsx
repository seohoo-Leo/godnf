// Todaygrade.jsx
import React from 'react';
import "../components/Todaygrade.style.css"; // 관련 스타일
import { Container, Row, Col } from 'react-bootstrap';
import DayGrade from './DayGrade';
import TopdayUpDate from './TopdayUpDate';

// 오늘의 등급 & 업데이트 내역을 보여주는 카드형 UI
const Todaygrade = () => {
  return (
    <Container className="today-grade">
      <Row>
        <Col xs={4} className="todaygrade">
          <DayGrade />
        </Col>
        <Col xs={8} className="todaygrade">
          <TopdayUpDate />
        </Col>
      </Row>
    </Container>
  );
};

export default Todaygrade;