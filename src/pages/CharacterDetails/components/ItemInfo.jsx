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
                    {Array.from({length:count}).map((_)=>(
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
                const setName3 = equip?.itemName 
                
                
                if(setName ){
                    setPointMap[setName] = (setPointMap[setName] || 0) +point;
                }
                if(setName2){
                    setPointMap[setName2] = (setPointMap[setName2] || 0) +point2;
                }
                if(setName3.startsWith("고유") || setName3.startsWith("개시")){
                    setPointMap["공통"] = (setPointMap["공통"] || 0 ) +point
                }

               
            });

            const pointSum = Object.entries(setPointMap)
            const maxItem = pointSum.length > 0?pointSum.reduce((maxSoFar, current)=>{
                return (current[1] > maxSoFar[1])? current : maxSoFar;
            }) : 0;   
            console.log(setPointMap);
             
          
          
          //세트 대표이미지 매치
          const setItemImgMatch = (setName) =>{
            
            const setImgMatch = {
                "칠흑의 정화 세트" : 2,
                "용투장의 난 세트" : 3,
                "에테리얼 오브 아츠 세트" : 4,
                "한계를 넘어선 에너지 세트" : 5,
                "압도적인 자연 세트" : 6,
                "고대 전장의 발키리 세트" : 7,
                "소울 페어리 세트" : 8,
                "그림자에 숨은 죽음 세트" : 9,
                "세렌디피티 세트" : 10,
                "마력의 영역 세트" : 11,
                "무리 사냥의 길잡이 세트" :12,
                "영원히 이어지는 황금향 세트" : 13
            }
            return setImgMatch[setName] || 0
        }

            //세트포인트별 등급
            const gradeRanges = [
                { min: 0, max: 1200, Grade: "레어", GradeNum: "" },
                { min: 1199, max: 1285, Grade: "유니크", GradeNum: "\u2160" },
                { min: 1284, max: 1370, Grade: "레어", GradeNum: "\u2160" },
                { min: 1369, max: 1455, Grade: "레어", GradeNum: "\u2160" },
                { min: 1454, max: 1540, Grade: "레어", GradeNum: "\u2160" },
                { min: 1539, max: 1650, Grade: "유니크", GradeNum: "\u2164" },
                { min: 1649, max: 1735, Grade: "레전더리", GradeNum: "\u2160" },
                { min: 1734, max: 1820, Grade: "레전더리", GradeNum: "\u2161" },
                { min: 1819, max: 1905, Grade: "레전더리", GradeNum: "\u2162" },
                { min: 1904, max: 1990, Grade: "레전더리", GradeNum: "\u2163" },
                { min: 1989, max: 2100, Grade: "레전더리", GradeNum: "\u2164" },
                { min: 2099, max: 2185, Grade: "에픽", GradeNum: "\u2160" },
                { min: 2184, max: 2270, Grade: "에픽", GradeNum: "\u2161" },
                { min: 2269, max: 2355, Grade: "에픽", GradeNum: "\u2162" },
                { min: 2354, max: 2440, Grade: "에픽", GradeNum: "\u2163" },
                { min: 2439, max: 2550, Grade: "에픽", GradeNum: "\u2164" },
                { min: 2549, max: Infinity, Grade: "태초", GradeNum: "" },
              ];

              const getPointGrade= (point)=>{
                 const result = gradeRanges.find(range => point > range.min && point <range.max )
                 return result || { Grade: "알 수 없음", GradeNum: "" } ;
              }
           
              console.log("장착장비 :",eItem );
              

  return (

    <Row className='setItem'>
        { (maxItem[0]!== "공통") &&
        <Row style={{backgroundColor:"#e9edf0"}} >
            <Col  xs={2} sm={2} lg={2} xl={2}  className='item-type'>세트</Col>
            <Col  xs={2} sm={2} lg={2} xl={2} >
                <img src={`/img/${setItemImgMatch(maxItem[0])}.png`} 
                    style={{width:"80px", height:"80px", padding:"5px"}}/>
            </Col>
            <Col  xs={4} sm={4} lg={4} xl={4} className={setPointMap['공통'] ? getPointGrade(maxItem[1]+setPointMap["공통"])["Grade"]:getPointGrade(maxItem[1])["Grade"]}
                style={{fontSize:"18px" , fontWeight:"700"}} >
                {maxItem[0]}
                {setPointMap['공통'] ? getPointGrade(maxItem[1]+setPointMap["공통"])["GradeNum"] :getPointGrade(maxItem[1])["GradeNum"] }
            </Col>
            <Col  xs={2} sm={2} lg={2} xl={2} style={{color:"brown"}} >
            세트포인트 <span style={{fontSize:"x-large"}}>
                 {setPointMap['공통']  ? maxItem[1]+setPointMap["공통"] : maxItem[1]}
                </span>
            </Col>
        </Row>}
        
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
