import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useCharacterStatus } from '../../../hooks/useCharacterStatus'
import { useSearchParams } from 'react-router-dom'

const StatInfo = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')

    const {data} = useCharacterStatus(server, Name)
    let statusNeed = []
    let Matchedstatus = {}
    data?.status?.map(status=> 
        status.length <  statusNeed.push(status));

    
    console.log("캐릭터 스탯:", data)
        
    const statusMatch =(status) =>{
        const needStatusName =["물리 방어율","힘","체력","물리 공격","물리 크리티컬","독립 공격","공격 속도","화속성 강화","명속성 강화"]
        

        if(needStatusName.includes(status?.name)){
            return Matchedstatus = { "name": status.name , "value" : status.value }
        }
    }
    const statusMatch2=(status) =>{
        const needStatusName2 = ["마법 방어율", "지능", "정신력", "마법 공격", "마법 크리티컬", "모험가 명성", "캐스팅 속도","수속성 강화","암속성 강화"]

        if(needStatusName2.includes(status?.name)){
            return Matchedstatus = { "name": status.name, "value" : status.value }
        }
    }

  

  return (
    <Row style={{margin:"2%"}}>
        <Col>
             {statusNeed?.map((s, index)=> 
              statusMatch(s)? 
                <Row className='status'> 
                <Col lg={5} xl={5}>
                {(<img src= {`${`/img/status/`+`${index}`+`.png`}`} style={{padding:"7px"}}/> )}
                { statusMatch(s)["name"]}</Col>
                <Col lg={7} xl={7}
                    style={{borderLeft:"0.5px solid rgba(0, 0, 0, 0.2)"}}>
                {statusMatch(s)["value"]}</Col>
             </Row> : ""
              
            )} 
        </Col>
        <Col>
        {statusNeed?.map((s,index)=> 
        statusMatch2(s)? 
            <Row className='status'>                
                <Col lg={5} xl={5}>
                { statusMatch2(s) ? (<img src= {`${`/img/status/`+`${index}`+`.png`}`}  style={{padding:"7px"}}/> ): "" }
                {statusMatch2(s) ? statusMatch2(s)["name"]: ""}
                </Col>
                <Col lg={7} xl={7}
                    style={{borderLeft:"0.5px solid rgba(0, 0, 0, 0.2)"}}>
                {statusMatch2(s) ? statusMatch2(s)["value"]: ""}</Col>
            </Row> : ""
             )}
        </Col>
    </Row>
  )
}

export default StatInfo
