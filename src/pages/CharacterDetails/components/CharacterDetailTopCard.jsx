import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import TimeLineInfo from './TimeLineInfo'

/**
 * CharacterDetailTopCard 컴포넌트
 * - 캐릭터 상세 화면의 상단 카드 정보를 출력
 * - 캐릭터 이미지, 이름, 서버명, 모험가명, 명성치, 길드명 등을 포함
 */

const CharacterDetailTopCard = ({ data, server }) => {
  return (
    <Container style={{ height: "auto", minWidth: "1200px" }}>
      <div className="character-info" style={{ marginBottom: "0px", minWidth: "1050px" }}>
        <Row>
          {/* 왼쪽: 캐릭터 이미지 및 기본 정보 */}
          <Col xs={4} className="character-imgcard">
            <div className='characterDetailBG'>
              
              {/* 전직명 표시 */}
              <div className="character-imgcard-info">
                {data?.jobGrowName}
              </div>

              {/* 캐릭터 일러스트 이미지 */}
              <Col xs={12}>
                <img 
                  src={data?.characterImage} 
                  style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} 
                  alt="character" 
                />
              </Col>

              {/* 모험가 명 / 캐릭터 명 / 서버 명 */}
              <p className='character-imgcard-info ad'>{data?.adventureName}</p>
              <p className='character-imgcard-info cn'>{data?.characterName}</p>
              <p className='character-imgcard-info sv'>
                {server === "cain" && "카인"}
                {server === "diregie" && "디레지에"}
                {server === "siroco" && "시로코"}
                {server === "prey" && "프레이"}
                {server === "casillas" && "카시야스"}
                {server === "hilder" && "힐더"}
                {server === "bakal" && "바칼"}
              </p>
            </div>
          </Col>

          {/* 오른쪽: 명성, 캐릭터명, 모험가/길드명, 타임라인 */}
          <Col xs={6}>
            {/* 명성치 표시 */}
            <div className='fame'>
              <img src={`${process.env.PUBLIC_URL}/img/fame.png`} style={{ height: "30px", paddingRight: "2%" }} alt="fame icon" />
              {data?.fame}
            </div>

            {/* 캐릭터 이름 크게 출력 */}
            <div className="charName">{data?.characterName}</div>

            {/* 모험가명 및 길드명 출력 */}
            <div className='ad-gu-Name'>
              <div className='ad-Name'>{data?.adventureName}</div>
              <div className='gu-Name'>{data?.guildName}</div>
            </div>

            {/* 타임라인 정보 (별도 컴포넌트) */}
            <TimeLineInfo />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CharacterDetailTopCard;