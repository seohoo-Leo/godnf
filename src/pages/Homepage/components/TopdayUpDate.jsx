import React from 'react';
import { Accordion } from 'react-bootstrap';

// 업데이트 내역 목록
const updates = [
  { date: '2025-04-05', content: '업데이트 하였습니다.' },
  { date: '2025-04-01', content: '캐릭터 검색 기능 개선' },
  { date: '2025-03-28', content: '경매장 필터 버그 수정' }
];

const TopdayUpDate = () => {
  return (
    <div className="p-4 border rounded shadow" style={{ minWidth: "100%" }}>
      업데이트 내역
      <hr />
      <Accordion>
        {updates.map((item, idx) => (
          <Accordion.Item key={idx} eventKey={String(idx)}>
            <Accordion.Header>{item.date}</Accordion.Header>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default TopdayUpDate;