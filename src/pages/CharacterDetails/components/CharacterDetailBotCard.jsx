import React, { act, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ItemInfo from './ItemInfo'
import StatInfo from './StatInfo'
import Avata from './Avata'


const CharacterDetailBotCard = (EItem) => {

  const [activeComponent,setActiveComponent] = useState('item');

  const renderComponent=()=>{
  
    if(activeComponent === "item"){
      return<ItemInfo EItem={EItem}/>
    }if(activeComponent === "stat"){
      return< StatInfo />
    }if(activeComponent ==="detailStat"){
      return 
    }if(activeComponent === "avatar"){
      return <Avata />
    }
  }

  return (
    <Container style={{height:"auto"}}>
        <div className="character-info-bot" style={{marginTop:"30px" }}>
            <Row className='menubar'>
                <Col onClick={()=>setActiveComponent('item')} 
                    style={{ 
                      cursor: 'pointer', 
                      fontWeight: activeComponent === 'item' ? 'bold' : '' ,
                      borderBottom: activeComponent === 'item' ? '2px solid black': ""
                        }}>장착장비</Col>
                <Col onClick={()=>setActiveComponent('stat')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'stat' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'stat' ? '2px solid black': ""
                          }}>스탯</Col>
                <Col onClick={()=>setActiveComponent('detailStat')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'detailStat' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'detailStat' ? '2px solid black': ""
                          }}>세부스탯</Col>
                <Col onClick={()=>setActiveComponent('avatar')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'avatar' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'avatar' ? '2px solid black': ""
                          }}>아바타/크리쳐</Col>
                <Col>버프강화</Col>
                <Col>탈리스만</Col>
                <Col>딜표</Col>
                <Col>스킬정보</Col>
            </Row>
              {renderComponent()}
           
        </div>
       
    </Container>
  )
}

export default CharacterDetailBotCard
