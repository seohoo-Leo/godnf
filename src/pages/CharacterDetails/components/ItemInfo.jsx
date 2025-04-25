import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useItemId } from '../../../hooks/useItemId';

const ItemInfo = (EItem) => {

    const eItem = EItem.EItem.EItem;
    const simplifyEnchantName= (name) =>{
        //그룹화 매핑
        const statGroup = ["힘", "지능", "정신력", "체력"];
        const statAGroup = ["물리 공격력","독립 공격력","마법 공격력"]
        const statCGroup = ["물리 크리티컬 히트", "마법 크리티컬 히트"]

        if(statGroup.includes(name)){
            return "스탯"
        }
        if(statAGroup.includes(name)){
            return "공격력"
        }
        if(statCGroup.includes(name)){
            return "크리"
        }

        const enchantNameMap = {
            "모든 속성 강화" : "모속강",
            "명속성강화" : "명속강",
            "암속성강화" : "암속강",
            "화속성강화" : "화속강",
            "수속성강화" : "수속강",
            "최종 데미지" : "스증"
            //기타 맵핑 추가
            }
         return enchantNameMap[name] || name;
        }

        const ImageRepeater = ( item, count)=>{
            return(
                <div>
                    {Array.from({length:count}).map((_,index)=>(
                        <img src={`/img/${item}.png`}
                        style={{width:"30px",height:"30px" }}/>
                    ))}
                </div>
            )
        }

        
            const equipments= eItem 
            const setPointMap = {};

            equipments?.forEach( (equip) => {
                const setName = equip?.setItemName;
                const point =  (equip.tune)?.map((a)=> a.setPoint)[0] || 0;
                const setName2 = equip?.upgradeInfo?.setItemName  
                const point2 = equip?.upgradeInfo?.setPoint
                   
                if(setName){
                    setPointMap[setName] = (setPointMap[setName] || 0) +point;
                }
                if(setName2){
                    setPointMap[setName2] = (setPointMap[setName] || 0) +point2;
                }

               
            });

            const pointSum = Object.entries(setPointMap)
            const maxItem = pointSum.reduce((maxSoFar, current)=>{
                return (current[1] > maxSoFar[1])? current : maxSoFar;
            })   
            
          console.log(equipments);
          

            
  return (

    <Row className='setItem'>
        <Row >
            <Col  xs={2} sm={2} lg={2} xl={2}  className='item-type'>세트</Col>
            <Col  xs={2} sm={2} lg={2} xl={2} >세트이미지</Col>
            <Col  xs={4} sm={4} lg={4} xl={4} >
                {maxItem[0]}
            </Col>
            <Col  xs={2} sm={2} lg={2} xl={2} >세트포인트 :{maxItem[1]}</Col>
        </Row>
        { eItem?.map((items)=> 
            <Row>
                <Col  xs={2} sm={2} lg={2} xl={2}  className='item-type'>{items?.slotName}</Col>
                <Col  xs={2} sm={2} lg={2} xl={2} >
                 <img src={`https://img-api.neople.co.kr/df/items/${items?.itemId}`}
                      style={{width:"50px", height:"50px", padding:"5px"}}/>
                 </Col>
                <Col  xs={4} sm={4} lg={4} xl={4} className={`${items?.itemRarity}`} >
                    <ul className="itemName_tune">
                    <li className='Name'>{items?.itemName}</li>
                     
                     <li className="li">
                        {items?.tune?.map(tune=> tune.level)[0] === 0? "":""}
                        { items?.tune?.map(tune=> tune.level)[0]===1? " \u2160":""}
                        { items?.tune?.map(tune=> tune.level)[0]===2? " \u2161":"" }
                        { items?.tune?.map(tune=> tune.level)[0]===3? " \u2162":"" }
                     </li>
                    </ul>
                    <ul className="enchant-ul">
                    {[ ...new Set(
                        items?.enchant?.status.map(e => `${simplifyEnchantName(e.name)}+${e.value}`)
                    )].map(text =>(
                        <li>{text}</li>))}
                    </ul>

                </Col>
                <Col  xs={2} sm={2} lg={2} xl={2} className={`${items?.upgradeInfo?.itemRarity}`}>
                        {items?.upgradeInfo?.itemName === undefined ? "": `${items?.upgradeInfo?.itemName}`.substr(0,2)}
                        { (items?.fusionOption?.options?.map(f=> f?.engrave)[0]?.color) === "gold"? ImageRepeater((items?.fusionOption?.options?.map(f=> f?.engrave)[0]?.color), (items?.fusionOption?.options?.map(f=> f?.engrave)[0]?.value)) :""}
                </Col>
                <Col xs={1} sm={1} lg={1} xl={1} style={{fontSize:"large", fontWeight:"bold"}}>
                   +{items?.reinforce} 
                    
                        
                </Col>
            </Row>     
        )}
 </Row>
  )
}

export default ItemInfo
