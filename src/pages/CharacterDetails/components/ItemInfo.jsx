import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const ItemInfo = (EItem) => {
    // const [eItem,seteItem] = useState([]);
    const eItem = EItem.EItem.EItem;

    console.log(eItem)


   
  return (

    <Row className='setItem'>
        <Row >
            <Col  xs={2} sm={2} lg={2} xl={2}  className='item-type'>세트</Col>
            <Col  xs={2} sm={2} lg={2} xl={2} >세트이미지</Col>
            <Col  xs={4} sm={4} lg={4} xl={4} >세트이름</Col>
            <Col  xs={2} sm={2} lg={2} xl={2} >세트포인트</Col>
        </Row>
        {eItem?.map((items)=> 
            <Row>
                <Col  xs={2} sm={2} lg={2} xl={2}  className='item-type'>{items?.slotName}</Col>
                <Col  xs={2} sm={2} lg={2} xl={2} >
                 <img src={`https://img-api.neople.co.kr/df/items/${items?.itemId}`}
                      style={{width:"50px", height:"50px", padding:"5px"}}/>
                 </Col>
                <Col  xs={4} sm={4} lg={4} xl={4} className={`${items.itemRarity}`} >
                    {items?.itemName}
                </Col>
                <Col  xs={2} sm={2} lg={2} xl={2} >
                        {items?.upgradeInfo?.itemName === undefined ? "": `${items?.upgradeInfo?.itemName}`.substr(0,2)}
                        {items?.setEquipCount}
                       
                </Col>
            </Row>)}
 </Row>
  )
}

export default ItemInfo
