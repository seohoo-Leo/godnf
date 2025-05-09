import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CharacterSearch from '../Homepage/components/CharacterSearch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCharacter } from '../../hooks/useCharacter';  // 캐릭터 정보 요청을 위한 커스텀 훅
import "../CharacterList/CharacterList.style.css";
import CharacterCard from './components/CharacterCard';

const CharacterList = ({
  selectedName,
  selectedServer,
  selectedServerId,
  setSelectedName,
  setSelectedServer,
  setSelectedServerId
}) => {

  // URL에서 쿼리 파라미터(serverId, characterName) 추출
  const [query, setQuery] = useSearchParams();
  const server = query.get("serverId");
  const Name = query.get("characterName");

  // 페이지 이동을 위한 라우터 훅
  const navigate = useNavigate();

  // 캐릭터 데이터를 가져오는 커스텀 훅
  const { data, isLoding } = useCharacter(server, Name);

  // 로딩 중일 때 표시할 내용 (현재는 누락되어 있음)
  if (isLoding) {
    return <h1>Loading...</h1>;
  }

  // 로고 클릭 시 홈으로 이동
  const gohome = () => {
    navigate('/');
  };

  return (
    <Container>
      {/* 상단 로고 영역 - 클릭 시 홈으로 이동 */}
      <div className="nav-section" onClick={gohome}>
        <img src={`${process.env.PUBLIC_URL}/img/logoDNF.png`} alt="로고" />
      </div>

      {/* 캐릭터 검색 컴포넌트 */}
      <CharacterSearch
        selectedServer={selectedServer} setSelectedServer={setSelectedServer}
        selectedServerId={selectedServerId} setSelectedServerId={setSelectedServerId}
        selectedName={selectedName} setSelectedName={setSelectedName}
      />

      {/* 캐릭터 목록 카드 컴포넌트 */}
      <CharacterCard data={data} />
    </Container>
  );
};

export default CharacterList;