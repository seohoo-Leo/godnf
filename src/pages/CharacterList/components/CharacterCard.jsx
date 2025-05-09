import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CharacterCard = ({ data }) => {
  const navigate = useNavigate();
  const [detailedData, setDetailedData] = useState();

  // ⬇️ 캐릭터 상세 정보(adventureName 포함)를 불러오는 비동기 처리
  useEffect(() => {
    const fetchDetails = async () => {
      if (!data || data.length === 0) return;

      // 캐릭터 목록 각각에 대해 상세 정보 요청 
      const promise = data.map((char) =>
        axios
          .get(
            `http://localhost:3001/api/characters/details?serverId=${char.serverId}&characterId=${char.characterId}`
          )
          .then((res) => ({
            ...char,
            adventureName: res.data.adventureName || '없음',
          }))
          .catch(() => ({
            ...char,
            adventureName: '불러오기 실패',
          }))
      );

      const result = await Promise.all(promise);
      setDetailedData(result); // 상세 정보 저장
    };

    fetchDetails();
  }, [data]);

  // ⬇️ 캐릭터 클릭 시 상세 페이지로 이동
  const goCharacterDetails = (serverId, characterId) => {
    navigate(`characterDetails?server=${serverId}&name=${characterId}`);
  };

  return (
    <Container className="characterCardListPage">
      <Row className="character-card">
        {/* ⬇️ 상세 데이터가 있는 경우 캐릭터 카드 렌더링 */}
        {detailedData?.map((result, index) => (
          <Col
            key={index}
            xl={4}
            className="cardd"
            onClick={() => goCharacterDetails(result.serverId, result.characterId)}
            style={{ width: '300px' }}
          >
            {/* 서버 이름 한글 변환 */}
            <p style={{ marginTop: '15px', marginBottom: '8px' }}>
              {result.serverId === 'cain' && '카인'}
              {result.serverId === 'diregie' && '디레지에'}
              {result.serverId === 'siroco' && '시로코'}
              {result.serverId === 'prey' && '프레이'}
              {result.serverId === 'casillas' && '카시야스'}
              {result.serverId === 'hilder' && '힐더'}
              {result.serverId === 'bakal' && '바칼'}
            </p>

            {/* 캐릭터 이미지 */}
            <div className="characterbg">
              <img
                src={result.characterImage}
                alt="캐릭터"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'bottom',
                }}
              />
            </div>

            {/* 캐릭터 정보 하단 (이름, 모험단명, 명성치, 전직명) */}
            <Row className="character-info-bot">
              <Col className="Name">{result.characterName}</Col>
              <Col className="adv">{result.adventureName}</Col>
              <Col className="img">
                <img
                  src={`${process.env.PUBLIC_URL}/img/fame.png`}
                  alt="명성"
                  style={{ height: '20px', paddingRight: '3%' }}
                />
                {result.fame}
              </Col>
              <Col className="jobName">{result.jobGrowName}</Col>
            </Row>
          </Col>
        ))}

        {/* ⬇️ 검색 결과가 없는 경우 메시지 출력 */}
        {data?.length < 1 && <h3 style={{ textAlign: 'center' }}>검색결과가 없습니다</h3>}
        {data === undefined && <h3 style={{ textAlign: 'center' }}>검색 결과</h3>}
      </Row> 
    </Container>
  );
};

export default CharacterCard;