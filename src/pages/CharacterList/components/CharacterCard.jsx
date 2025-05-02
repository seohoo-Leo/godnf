import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useCharacterDetail } from '../../../hooks/useCharacterDetail';
import axios from 'axios';

  const CharacterCard = ({data}) => {
      const navigate = useNavigate();
      const [detailedData,setDetailedData] =useState()

        //캐릭터 상세정보 가져오기(adventureName 포함)
        useEffect(()=>{
           const fetchDetails = async() => {
             if(!data || data.length === 0 ) return;

              const promise = data.map((char) =>
               axios
                  .get(`http://localhost:3001/api/characters/details?serverId=${char.serverId}&characterId=${char.characterId}`,
                    { })
                .then((res)=>({
                    ...char,
                    adventureName: res.data.adventureName || "없음"
                })).
                catch(()=>({...char, adventureName : "불러오기 실패"}))
              )
       
                const result= await Promise.all(promise);
                setDetailedData(result)
           };
           fetchDetails();
        },[data]);



      const goCharacterDetails=(serverId, characterId)=>{
          navigate(`characterDetails?server=${serverId}&name=${characterId}`)
        }
        
      return (
      <Container className ="characterCardListPage">
            <Row className='character-card' >
            {detailedData?.map((result,index)=>
              <Col xl={4} className="cardd" onClick={()=>goCharacterDetails(result.serverId,result.characterId)} style={{ width:"300px"}} >
                  <p style={{marginTop:"15px", marginBottom:"8px" }}>
                      {result.serverId==="cain" ? "카인" : "" }
                      {result.serverId==="diregie" ? "디레지에" : ""}
                      {result.serverId==="siroco" ? "시로코" : ""}
                      {result.serverId==="prey" ? "프레이" : ""}
                      {result.serverId==="casillas" ? "카시야스" : ""}
                      {result.serverId==="hilder" ? "힐더" : ""}
                      {result.serverId==="bakal" ? "바칼" : ""}
                  </p>
                  <div className="characterbg">
                  <img src={result.characterImage} style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"bottom"}} />
                  </div>
                  <Row className="character-info-bot">
                    <Col className='Name'>{result.characterName}</Col>
                    <Col className="adv"> {result.adventureName} </Col>
                    <Col className='img'><img src="/img/fame.png"  
                      style={{height:"20px",
                          paddingRight:"3%"
                      }}/> {result.fame}</Col>
                    <Col className='jobName'>{result.jobGrowName}</Col>
                    
                  </Row>
              </Col>) } 
              {data?.length < 1 ? <h3 style={{textAlign:"center"}}>검색결과가 없습니다</h3> : ""} 
              {data === undefined ? <h3 style={{textAlign:"center"}}>검색 결과</h3> : ""}
            </Row>
          </Container>
        
    )
  }

  export default CharacterCard
