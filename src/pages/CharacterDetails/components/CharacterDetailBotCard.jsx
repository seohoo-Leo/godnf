import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ItemInfo from './ItemInfo'

const CharacterDetailBotCard = (EItem) => {
  return (
    <Container>
        <div className="character-info-bot">
            <Row className='menubar'>
                <Col xs={0}>장착장비</Col>
                <Col>스탯</Col>
                <Col>세부스탯</Col>
                <Col>아바타&크리쳐</Col>
                <Col>버프강화</Col>
                <Col>탈리스만</Col>
                <Col>딜표</Col>
                <Col>스킬정보</Col>
            </Row>
            <ItemInfo EItem={EItem}/>
           
        </div>
       
    </Container>
  )
}

export default CharacterDetailBotCard
