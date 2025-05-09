import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTalisman } from '../../../hooks/useTalisman';
import { Row, Col } from 'react-bootstrap';

const Talisman = () => {
  // ⬇️ URL에서 serverId와 characterId 추출
  const [query, setQuery] = useSearchParams();
  const server = query.get('server');
  const Name = query.get('name');

  // ⬇️ 탈리스만 및 룬 정보 가져오기
  const { data } = useTalisman(server, Name);
  const talisman = data?.talismans || [];

  // ⬇️ 룬 종류에 따라 글자 색상 지정
  const runesType = (runetype) => {
    if (runetype.includes("테라코타")) return "purple";
    if (runetype.includes("서클 메이지")) return "green";
    if (runetype.includes("수호자들")) return "blue";
    if (runetype.includes("고대 도서관")) return "yellow";
    if (runetype.includes("세컨드 팩트")) return "red";
    return ""; // 기본 색상
  };

  return (
    <Row style={{ margin: "2%" }}>
      {/* ⬇️ 탈리스만 카드 리스트 */}
      {talisman.map((items, idx) => (
        <Col className="talisman-card" key={idx}>
          {/* 탈리스만 이름 */}
          <Col className="talisman-name">{items?.talisman.itemName}</Col>

          {/* 탈리스만 이미지 */}
          <Col className="talisman-img">
            <img
              src={`https://img-api.neople.co.kr/df/items/${items?.talisman.itemId}`}
              style={{ width: "80px", height: "80px" }}
              alt="탈리스만"
            />
          </Col>

          {/* 룬 목록 */}
          <Col>
            <ul className="talisman-ul">
              {items?.runes?.map((rune, i) => (
                <li key={i} style={{ color: runesType(rune?.itemName) }}>
                  {rune?.itemName}
                </li>
              ))}
            </ul>
          </Col>
        </Col>
      ))}
    </Row>
  );
};

export default Talisman;