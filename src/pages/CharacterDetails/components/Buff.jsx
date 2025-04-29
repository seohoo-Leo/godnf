import React from 'react'
import { useBuff } from '../../../hooks/useBuff'
import { useSearchParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


const Buff = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')
    const {data} = useBuff(server,Name)

    const equipment = data?.skill?.buff?.equipment
    console.log(equipment);
    
  return (
        <Row className='setItem'>
        
            { equipment?.map((items)=> 
                <Row>
                    <Col  xs={2} sm={2} lg={2} xl={2}  className='item-type'>{items.slotName}</Col>
                    <Col  xs={2} sm={2} lg={2} xl={2} > 
                      <img src={`https://img-api.neople.co.kr/df/items/${items?.itemId}`}
                          style={{width:"50px", height:"50px", padding:"5px"}}/> 
                     </Col>
                    <Col  xs={4} sm={4} lg={4} xl={4} className={`${items?.itemRarity}`} >
                        <ul className="itemName_tune">
                        <li className='Name'>{items.itemName}</li>
                        </ul>
                    </Col>
                    <Col xs={1} sm={1} lg={1} xl={1} style={{fontSize:"large", fontWeight:"bold"}}>
                           
                    </Col>
                </Row>     
            )}
     </Row>
  )
}

export default Buff
