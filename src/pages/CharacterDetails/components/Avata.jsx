import React from 'react'
import { useAvata } from '../../../hooks/useAvata'
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { usePet } from '../../../hooks/usePet';

const Avata = () => {
  const [query, setQuery] = useSearchParams();
  const server = query.get('server');
  const Name = query.get('name');

  // 아바타 및 크리쳐 데이터 가져오기
  const { data } = useAvata(server, Name);
  const { data: petData } = usePet(server, Name);

     // 아바타 데이터 가공
  const avatInfo = data?.map((avata) => ({
    avata: avata?.avatar,
    avataImg: avata?.avatarImage,
    clone: avata?.clone,
    cloneImg: avata?.cloneImage,
  }));

  console.log('아바타 인포 : ', avatInfo); // 디버깅용 로그


  return (
    <Row style={{ margin: '2%' }}>
    {/* 아바타 정보 렌더링 */}
    {avatInfo?.map((avata, idx) => (
      <Row className="avatar" key={idx}>
        {/* 슬롯명 */}
        <Col className="slotName" style={{ flex: '0 0 150px', height: '40px' }}>
          {avata.avata.slotName}
        </Col>

        {/* 아바타 이미지 */}
        {avata.avataImg && (
          <Col style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'flex-end'}}>
            <img src={avata.avataImg} style={{ height: '35px', margin: '3px'}}/>
          </Col>
        )}

        {/* 클론 이미지 */}
        {avata.cloneImg !== null && (
          <Col style={{ flex: '0 0 60px', display: 'flex', margin: '0', padding: '0'}}>
            <img src={avata.cloneImg} style={{ height: '35px' }}  />
          </Col>
        )}

        {/* 이름 및 옵션 정보 */}
        <Col
          style={{
            flex: '0 0 340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col>{avata.clone.itemId === null ? avata.avata.itemName : avata.clone.itemName}</Col>
          <Col style={{ fontSize: 'small' }}>{avata?.avata.optionAbility}</Col>
        </Col>

        {/* 엠블렘 정보 */}
        <Col style={{ marginRight: '30px' }}>
          {avata.avata.emblems &&
            avata.avata.emblems.map((emb, i) => (
              <Row
                key={i}
                className={emb.itemRarity}
                style={{ fontSize: 'small', justifyContent: 'flex-end', display: 'flex' }}
              >
                {emb.itemName}
              </Row>
            ))}
        </Col>
      </Row>
    ))}

    {/* 크리쳐 정보 렌더링 */}
    <Row className="avatar">
      <Col className="slotName" style={{ flex: '0 0 150px', height: '40px' }}>
        크리쳐
      </Col>

      {/* 크리쳐 이미지 */}
      {petData && (
        <Col style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'flex-end' }}>
          <img src={petData?.CreatureImg} style={{ height: '35px', margin: '3px' }} alt="pet" />
        </Col>
      )}

      {/* 아티팩트 이미지 */}
      <Col style={{ flex: '0 0 60px', display: 'flex', margin: '0', padding: '0' }}>
        {petData?.ArtifactImg?.map((art, i) => (
          <Col key={i} style={{ margin: '2px' }}>
            <img style={{ width: '25px', height: '25px' }} src={art} alt="artifact" />
          </Col>
        ))}
      </Col>

      {/* 크리쳐 이름 */}
      {petData?.Creature?.itemName && (
        <Col
          style={{
            flex: '0 0 340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col>{petData.Creature.itemName}</Col>
        </Col>
      )}

      {/* 아티팩트 이름 */}
      <Col style={{ marginRight: '30px' }}>
        {petData?.Creature?.artifact?.map((art, i) => (
          <Row
            key={i}
            className={art?.itemRarity}
            style={{ fontSize: 'small', justifyContent: 'flex-end', display: 'flex' }}
          >
            {art?.itemName}
          </Row>
        ))}
      </Col>
    </Row>
  </Row>
);
};

export default Avata;