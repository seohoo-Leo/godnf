import React from 'react'
import {Row, Col } from 'react-bootstrap'


const ItemInfo = ({EItem}) => {
    const equipments = EItem?.EItem;
   
    
    // 인챈트 명칭 축약
    const simplifyEnchantName = (name) => {
      const groupMap = {
        스탯: ["힘", "지능", "정신력", "체력"],
        공격력: ["물리 공격력", "독립 공격력", "마법 공격력"],
        크리: ["물리 크리티컬 히트", "마법 크리티컬 히트"],
      };
      const enchantNameMap = {
        "모든 속성 강화": "모속강",
        "명속성강화": "명속강",
        "암속성강화": "암속강",
        "화속성강화": "화속강",
        "수속성강화": "수속강",
        "최종 데미지": "스증",
      };
  
      for (let key in groupMap) {
        if (groupMap[key].includes(name)) return key;
      }
      return enchantNameMap[name] || name;
    };

  // 이미지 반복기
  const ImageRepeater = (item, count) => (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <img
          key={idx}
          src={`/img/${item}.png`}
          style={{ width: '30px', height: '30px' }}
        />
      ))}
    </>
  );
             // 세트 포인트 계산
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

          // 가장 높은 세트 포인트
  const pointSum = Object.entries(setPointMap);
  const maxItem = pointSum.reduce((max, cur) => (cur[1] > max[1] ? cur : max), ['', 0]);

             
          
         // 세트 이미지 매칭
  const setItemImgMatch = (setName) => {
    const match = {
      '칠흑의 정화 세트': 2,
      '용투장의 난 세트': 3,
      '에테리얼 오브 아츠 세트': 4,
      '한계를 넘어선 에너지 세트': 5,
      '압도적인 자연 세트': 6,
      '고대 전장의 발키리 세트': 7,
      '소울 페어리 세트': 8,
      '그림자에 숨은 죽음 세트': 9,
      '세렌디피티 세트': 10,
      '마력의 영역 세트': 11,
      '무리 사냥의 길잡이 세트': 12,
      '영원히 이어지는 황금향 세트': 13,
    };
    return match[setName] || 0;
  };

            // 등급 정의
  const gradeRanges = [
    { min: 0, max: 1200, Grade: '레어', GradeNum: '' },
    { min: 1199, max: 1285, Grade: '유니크', GradeNum: 'Ⅰ' },
    { min: 1284, max: 1370, Grade: '레어', GradeNum: 'Ⅰ' },
    { min: 1369, max: 1455, Grade: '레어', GradeNum: 'Ⅰ' },
    { min: 1454, max: 1540, Grade: '레어', GradeNum: 'Ⅰ' },
    { min: 1539, max: 1650, Grade: '유니크', GradeNum: 'Ⅳ' },
    { min: 1649, max: 1735, Grade: '레전더리', GradeNum: 'Ⅰ' },
    { min: 1734, max: 1820, Grade: '레전더리', GradeNum: 'Ⅱ' },
    { min: 1819, max: 1905, Grade: '레전더리', GradeNum: 'Ⅲ' },
    { min: 1904, max: 1990, Grade: '레전더리', GradeNum: 'Ⅳ' },
    { min: 1989, max: 2100, Grade: '레전더리', GradeNum: 'Ⅴ' },
    { min: 2099, max: 2185, Grade: '에픽', GradeNum: 'Ⅰ' },
    { min: 2184, max: 2270, Grade: '에픽', GradeNum: 'Ⅱ' },
    { min: 2269, max: 2355, Grade: '에픽', GradeNum: 'Ⅲ' },
    { min: 2354, max: 2440, Grade: '에픽', GradeNum: 'Ⅳ' },
    { min: 2439, max: 2550, Grade: '에픽', GradeNum: 'Ⅴ' },
    { min: 2549, max: Infinity, Grade: '태초', GradeNum: '' },
  ];

  console.log(maxItem[0]);
  
const getPointGrade = (point) =>
    gradeRanges.find((g) => point > g.min && point < g.max) || { Grade: '알 수 없음', GradeNum: '' };

  const finalPoint = maxItem[1] + (setPointMap['공통'] || 0);
  const { Grade, GradeNum } = getPointGrade(finalPoint);

  return (

    <Row className='setItem'>
        { (maxItem[0]!== "공통") &&
        <Row style={{backgroundColor:"#e9edf0"}} >
            <Col  xs={2} className='item-type'>세트</Col>
            <Col  xs={2}  >
              {maxItem[0] && <img src={`{/img/${setItemImgMatch(maxItem[0])}.png}`} style={{width:"80px", height:"80px", padding:"5px"}}/>  }
            </Col>
            <Col  xs={4}  className={Grade}
                style={{fontSize:"18px" , fontWeight:"700"}} >
                {maxItem[0]} {GradeNum}            
            </Col>
            <Col  xs={2} style={{color:"brown"}} >
                 세트포인트 <span style={{fontSize:"x-large"}}>
                 {finalPoint}
                </span>
            </Col>
        </Row>}
        
            {/* 장비 출력 */}
        { equipments?.map((items)=> 
            <Row>
                <Col  xs={2}  className='item-type'>{items?.slotName}</Col>
                <Col  xs={2}>
                 <img src={`https://img-api.neople.co.kr/df/items/${items?.itemId}`}
                      style={{width:"50px", height:"50px", padding:"5px"}}/>
                 </Col>
                <Col  xs={4}  className={`${items?.itemRarity}`} >
                    <ul className="itemName_tune">
                        <li className='Name'>{items?.itemName}</li>
                        <li className="li">
                            {['Ⅰ', 'Ⅱ', 'Ⅲ'][items?.tune?.[0]?.level - 1] || ''}
                        </li>
                    </ul>
                    <ul className="enchant-ul">
                    {[ ...new Set(
                        items?.enchant?.status.map(e => `${simplifyEnchantName(e.name)}+${e.value}`)
                    )].map(text =>(
                        <li>{text}</li>))}
                    </ul>

                </Col>
                <Col  xs={2}  className={`${items?.upgradeInfo?.itemRarity}`}>
                        {items.upgradeInfo?.itemName?.slice(0, 2)}   
                        {items.fusionOption?.options?.[0]?.engrave?.color === 'gold' &&
              ImageRepeater('gold', items.fusionOption.options[0].engrave.value)}
                </Col>
                <Col xs={1}  style={{fontSize:"large", fontWeight:"bold"}}>
                   +{items?.reinforce}  
                </Col>
            </Row>     
       )}
 </Row>
  )}


export default ItemInfo
