import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({data}) => {
    const navigate = useNavigate();

    const goCharacterDetails=(serverId, characterId)=>{
        navigate(`characterDetails?server=${serverId}&name=${characterId}`)
      }
      
      
  
    return (
    <Container >
          <Row className='character-card' >
            {data?.map((result,index)=>
            <Col xs={12} sm={6} md={4} lg={3} onClick={()=>goCharacterDetails(result.serverId,result.characterId)} >
                <p>
                    {result.serverId==="cain" ? "카인" : "" }
                    {result.serverId==="diregie" ? "디레지에" : ""}
                    {result.serverId==="siroco" ? "시로코" : ""}
                    {result.serverId==="prey" ? "프레이" : ""}
                    {result.serverId==="casillas" ? "카시야스" : ""}
                    {result.serverId==="hilder" ? "힐더" : ""}
                    {result.serverId==="bakal" ? "바칼" : ""}
                </p>
                <div>
                <img src={result.characterImage} style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"bottom"}} />
                </div>
                <p>{result.characterName} </p>
                <p>명성 : {result.fame}</p>
                <p>{result.jobGrowName}</p>

            </Col>)} 
          </Row>
        </Container>
       
  )
}

export default CharacterCard
