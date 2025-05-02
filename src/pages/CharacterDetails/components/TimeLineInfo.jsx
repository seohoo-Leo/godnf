import React from 'react'
import { useTimeLine } from '../../../hooks/useTimeLine';
import { useSearchParams } from 'react-router-dom';
import { Row,Col, Container } from 'react-bootstrap';


const TimeLineInfo = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')
    
    const{data} = useTimeLine(server,Name);
    
    const TimeLine = data?.timeline?.rows.map(t => t.code)=== 513 || 507 || 505 || 504? data?.timeline?.rows : null
    
     //513	아이템 획득(던전 카드 보상)
     //507	아이템 획득(레이드 카드 보상)
     //505	아이템 획득(던전 드랍)
     //504	아이템 획득(항아리&상자)
    console.log("타임라인 : ", TimeLine);

  return (
    <div>
       <p style={{marginTop:"18px", 
                 fontSize:"18px", 
                 fontWeight:"bold", 
                 color:" rgba(132, 9, 144, 0.713)",
                 borderBottom: "0.1px solid rgba(0, 0, 0, 0.2)",
                 width:"600px",
                 paddingBottom:"7px",
                 textAlign:"end"}}>아이템 획득 정보</p> 
    <div className="timeline">

        {TimeLine?.map(item => 
            (item?.code  === 513 || item?.code  ===507 || item?.code  ===505 || item?.code  ===504 )&&
            <Row className="info">
                <Col className='date'>
                    <Col>{(item?.date).slice(0,11)}</Col>
                    <Col>{(item?.date).slice(11)}</Col>
                </Col>
                <Col className='img'> 
                <img src={`https://img-api.neople.co.kr/df/items/${item?.data?.itemId}`} 
                    style={{width:"40px", height:"40px", padding:"5px"}}/>
                </Col>
                <Col className={`${item?.data?.itemRarity} name`}>{item?.data.itemName}</Col>
                <Col className='server'>
                {item?.data?.channelName? 
                                <Col style={{fontSize:"16px", fontWeight:"bolder", display:"flex", alignItems:"center", justifyContent:'center'}}>{item.name.slice(7,item.name.length-1)}</Col>
                                : <Col style={{fontSize:"14px", fontWeight:"bolder",display:"flex", alignItems:"center", justifyContent:'center' }}>{item.name.slice(7,item.name.length-1)}</Col>}
                    {item?.data?.channelName && 
                    <div>
                    <Col style={{fontSize:"small"}} >{item?.data.channelName +" "+ item?.data.channelNo}</Col>
                    </div> }
                     
                    
                 </Col>
            </Row> )}
            
        </div> 
    </div>
  )
}

export default TimeLineInfo
