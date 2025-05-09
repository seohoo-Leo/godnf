import React from 'react';
import { useTimeLine } from '../../../hooks/useTimeLine';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

const TimeLineInfo = () => {
  // ⬇️ URL에서 serverId와 characterId 추출
  const [query, setQuery] = useSearchParams();
  const server = query.get('server');
  const Name = query.get('name');

  // ⬇️ 커스텀 훅을 통해 타임라인(아이템 획득 로그) 데이터 요청
  const { data } = useTimeLine(server, Name);

  // ⬇️ 특정 코드(획득 종류)에 해당하는 타임라인만 필터링
  const TimeLine = data?.timeline?.rows?.filter(
    t => [513, 507, 505, 504].includes(t.code)
  );

  // 디버깅용 로그
  console.log("타임라인 : ", TimeLine);

  return (
    <div>
      {/* ⬇️ 섹션 헤더 */}
      <p style={{
        marginTop: "18px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "rgba(132, 9, 144, 0.713)",
        borderBottom: "0.1px solid rgba(0, 0, 0, 0.2)",
        width: "600px",
        paddingBottom: "7px",
        textAlign: "end"
      }}>
        아이템 획득 정보
      </p>

      {/* ⬇️ 타임라인 리스트 */}
      <div className="timeline">
        {TimeLine?.map((item, index) => (
          <Row className="info" key={index}>
            {/* 날짜 정보 */}
            <Col className="date">
              <Col>{item?.date?.slice(0, 11)}</Col>
              <Col>{item?.date?.slice(11)}</Col>
            </Col>

            {/* 아이템 이미지 */}
            <Col className="img">
              <img
                src={`https://img-api.neople.co.kr/df/items/${item?.data?.itemId}`}
                style={{ width: "40px", height: "40px", padding: "5px" }}
                alt="획득 아이템"
              />
            </Col>

            {/* 아이템 이름 (희귀도에 따라 클래스 적용) */}
            <Col className={`${item?.data?.itemRarity} name`}>
              {item?.data?.itemName}
            </Col>

            {/* 채널 및 던전 정보 */}
            <Col className="server">
              <Col
                style={{
                  fontSize: item?.data?.channelName ? "16px" : "14px",
                  fontWeight: "bolder",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'center'
                }}
              >
                {item.name.slice(7, item.name.length - 1)}
              </Col>
              {item?.data?.channelName &&
                <div>
                  <Col style={{ fontSize: "small" }}>
                    {item?.data.channelName + " " + item?.data.channelNo}
                  </Col>
                </div>
              }
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default TimeLineInfo;