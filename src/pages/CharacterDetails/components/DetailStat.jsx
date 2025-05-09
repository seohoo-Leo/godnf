import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useCharacterStatus } from '../../../hooks/useCharacterStatus';
import { Container, Row, Col } from 'react-bootstrap'

const DetailStat = () => {
    
    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')

      // 캐릭터 스탯 데이터 호출 (커스텀 훅 사용)
    const {data} = useCharacterStatus(server, Name)

     // 중요 스탯 이름 정의
  // 중요 스탯 이름 정의
  const importantStats = [
    "공격력 증가",
    "버프력",
    "최종 데미지 증가",
    "쿨타임 감소",
    "쿨타임 회복속도",
    "최종 쿨타임 감소율"
  ];

  // 중요 스탯만 필터링
  const filteredStats = data?.status?.filter(stat => importantStats.includes(stat.name));

  const filteredStats2 = data?.status?.filter(stat=> ["공격력 증폭","버프력 증폭"].includes(stat.name));

    
  console.log(filteredStats2);
    

  return (
    <Row className='setItem'>
        { filteredStats?.map((stat, i) =>
              <Row>
                  {/* 스탯 이름 */}
                  <Col  xs={4}  className='status_detail Name'>
                   {stat?.name}
                  </Col>
                   {/* 스탯 값 출력: "공격력 증가"와 "버프력"은 괄호 안에 %값 표시 */}
                 <Col  xs={8}   className='status_detail Num'>
                 {["공격력 증가", "버프력"].includes(stat.name)? 
                 `${stat.value} (${filteredStats2[i]?.value} %)` // 예: 1000 (35 %)
              : `${stat.value} %`}
                </Col>
            </Row>         
        )}
    </Row>
  )
}

export default DetailStat
