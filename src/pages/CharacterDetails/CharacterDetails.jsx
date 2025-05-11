import React from 'react';
import "../CharacterDetails/CharacterDetails.style.css";
import { useSearchParams } from 'react-router-dom';
import { useCharacterDetail } from '../../hooks/useCharacterDetail';
import { Container } from 'react-bootstrap';
import CharacterDetailTopCard from './components/CharacterDetailTopCard';
import CharacterDetailBotCard from './components/CharacterDetailBotCard';
import { useEItem } from '../../hooks/useEItem';

const CharacterDetails = () => {
  // URL 쿼리 파라미터에서 서버 ID 및 캐릭터 ID 추출
  const [query, setQuery] = useSearchParams();
  const server = query.get('server');
  const Name = query.get('name');

  //  캐릭터 기본 정보 호출 (모험단명, 직업 등)
  const { data } = useCharacterDetail(server, Name);

  //  장착 장비 정보 호출
  const { data: EItem } = useEItem(server, Name);
  console.log(process.env.REACT_APP_API_BASE_URL)
  return (
    <Container>
      {/*캐릭터 상단 카드 (기본 정보 렌더링) */}
      <CharacterDetailTopCard data={data} server={server} />

      {/*캐릭터 하단 카드 (장비 정보 렌더링) */}
      <CharacterDetailBotCard EItem={EItem} />
    </Container>
  );
};

export default CharacterDetails;