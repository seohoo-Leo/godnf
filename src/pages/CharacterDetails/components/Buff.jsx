import React from 'react';
import { useBuff } from '../../../hooks/useBuff'; // 커스텀 훅: 버프 관련 데이터 호출
import { useSearchParams } from 'react-router-dom'; // URL 쿼리 파라미터 접근
import { Row, Col } from 'react-bootstrap';

/**
 * Buff 컴포넌트
 * - 특정 캐릭터의 버프 스킬 장비 정보를 표시
 * - 서버명과 캐릭터명은 URL 쿼리로부터 받아옴 (?server=xxx&name=yyy)
 */
const Buff = () => {
  // URL 쿼리에서 서버와 캐릭터명 추출
  const [query, setQuery] = useSearchParams();
  const server = query.get('server');
  const Name = query.get('name');

  // 커스텀 훅을 통해 버프 정보 호출
  const { data } = useBuff(server, Name);
  const equipment = data?.skill?.buff?.equipment;

  console.log(equipment); // 디버깅용 출력

  return (
    <Row className="setItem">
      {/* 버프 장비 목록 렌더링 */}
      {equipment?.map((items, index) => (
        <Row key={index}>
          {/* 장비 슬롯 이름 (ex. 무기, 상의 등) */}
          <Col xs={2}  className="item-type">
            {items.slotName}
          </Col>

          {/* 장비 이미지 */}
          <Col xs={2} >
            <img
              src={`https://img-api.neople.co.kr/df/items/${items?.itemId}`}
              style={{ width: '50px', height: '50px', padding: '5px' }}
              alt={items?.itemName}
            />
          </Col>

          {/* 장비 이름 (희귀도에 따라 클래스 지정됨) */}
          <Col xs={6}
            className={`${items?.itemRarity}`} // 예: '레전더리', '에픽' 등
          >
            <ul className="itemName_tune">
              <li className="Name">{items.itemName}</li>
            </ul>
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default Buff;