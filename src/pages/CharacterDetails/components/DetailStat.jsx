import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useCharacterStatus } from '../../../hooks/useCharacterStatus';
import { Container, Row, Col } from 'react-bootstrap'

const DetailStat = () => {
    
    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')

    const {data} = useCharacterStatus(server, Name)
    let MStatus = {}

    const  statusMatch=(sta)=>{

        const NeedStatus = ["공격력 증가" , "버프력", "최종 데미지 증가", "쿨타임 감소", "쿨타임 회복속도", "최종 쿨타임 감소율"]
    
        if( NeedStatus?.includes(sta?.name)){
              
            return MStatus = {"name": sta?.name , "value" : sta?.value}
        }
   
    }
        
    
    

  return (
    <Row className='setItem'>
        {data?.status?.map((sta, index) =>
             statusMatch(sta) ?<Row >
                 <Col  xs={4} sm={4} lg={4} xl={4}  className='status_detail Name'>{sta?.name }</Col>
                 <Col  xs={8} sm={8} lg={8} xl={8}  className='status_detail Num'>
                  { sta?.name === "공격력 증가" || sta?.name ==="버프력" ? sta?.value +`(` + data.status[ index+2].value +" %)" : + sta?.value + " %"  }
                </Col>
            </Row> : ""
                           
        )}
    </Row>
  )
}

export default DetailStat
