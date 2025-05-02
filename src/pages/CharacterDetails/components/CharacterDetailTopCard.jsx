import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import TimeLineInfo from './TimeLineInfo'

const CharacterDetailTopCard = ({data,server}) => {
  return (
    <Container style={{height:"auto" ,minWidth:"1200px"}} >
    <div className="character-info"  style={{marginBottom:"0px", minWidth:"1050px"}}>
      <Row>
        <Col xs={4} sm={4} lg={4} xl={4} className="character-imgcard">
            <div className='characterDetailBG'>
            <div className="character-imgcard-info">{data?.jobGrowName}</div>
            <Col  xs={12} sm={12} lg={12} xl={12}>
              <img src={`${data?.characterImage}`} 
                style={{width:"100%",
                            height:"100%",
                            justifyContent:"center",
                            alignItems:"center",
                    }} />
            </Col>
            <p className='character-imgcard-info ad'> 
                {data?.adventureName}
            </p>
            <p className='character-imgcard-info cn'>        
            {data?.characterName}
            </p>
              <p className='character-imgcard-info sv'>  
                    {server==="cain" ? "카인" : "" }
                    {server==="diregie" ? "디레지에" : ""}
                    {server==="siroco" ? "시로코" : ""}
                    {server==="prey" ? "프레이" : ""}
                    {server==="casillas" ? "카시야스" : ""}
                    {server==="hilder" ? "힐더" : ""}
                    {server==="bakal" ? "바칼" : ""}
              </p>
            </div>
        </Col>
        <Col xs={6} sm={6} lg={6} xl={6}>
            <div className='fame'>
                <img src="/img/fame.png"  
                    style={{height:"30px",
                        paddingRight:"2%"
                    }}/> {data?.fame}
            </div>
            <div className="charName">
                {data?.characterName}
            </div>
            <div className='ad-gu-Name'>
                <div className='ad-Name'>{data?.adventureName}</div>
                <div className='gu-Name'>{data?.guildName}</div>
            </div>
             <TimeLineInfo/>
        </Col>
      </Row>
      </div>
</Container>
  )
}

export default CharacterDetailTopCard
