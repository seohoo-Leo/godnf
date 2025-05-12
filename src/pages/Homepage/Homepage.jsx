import React from 'react'
import { Container } from 'react-bootstrap'
import "../Homepage/Homepage.style.css"  // 스타일 파일 import
import CharacterSearch from './components/CharacterSearch'  // 캐릭터 검색 컴포넌트 import
import Todaygrade from './components/Todaygrade'  // 오늘의 등급 컴포넌트 import
import { useNavigate } from 'react-router-dom'  // 페이지 이동을 위한 useNavigate 훅 import
import useSelectedInfo from '../../store/useSelectedInfo'

// Homepage 컴포넌트 정의
const Homepage = () => {

  const {selectedName, selectedServer, selectedServerId, setSelectedName, setSelectedServer, setSelectedServerId} = useSelectedInfo();

  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수 사용
  
  // 홈으로 돌아가기 위한 함수
  const gohome = () => {
    navigate('/');  // '/' 경로로 이동
  }

  return (
    <div className='homepage'>
      <Container>  {/* 부트스트랩 컨테이너로 레이아웃 감싸기 */}
      
        {/* 로고 클릭 시 홈으로 돌아가는 네비게이션 영역 */}
        <div className="nav-section" onClick={gohome}>
          <img src={`${process.env.PUBLIC_URL}/img/logoDNF.png`}alt="DNF Logo" />  {/* 로고 이미지 */}
        </div>

        {/* 캐릭터 검색 컴포넌트 영역 */}
        <div className="search-section">
          <CharacterSearch />
        </div>

        {/* 구분선 */}
        <hr style={{minWidth:"720px"}} />
        
        {/* 오늘의 등급 컴포넌트 영역 */}
        <div>
          <Todaygrade />
        </div>

      </Container>
    </div>
  )
}

export default Homepage  // Homepage 컴포넌트 내보내기
