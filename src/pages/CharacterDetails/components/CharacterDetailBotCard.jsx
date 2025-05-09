import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemInfo from './ItemInfo';
import StatInfo from './StatInfo';
import Avata from './Avata';
import Buff from './Buff';
import Talisman from './Talisman';
import DetailStat from './DetailStat';

/**
 * CharacterDetailBotCard 컴포넌트
 * - 캐릭터 상세 하단 영역에서 탭별로 정보(장비, 스탯, 아바타 등)를 전환해서 표시하는 UI
 * - 각 탭은 컴포넌트로 분리되어 있으며, 클릭 시 슬라이드 전환 효과 및 높이 조정 기능이 포함됨
 */
const CharacterDetailBotCard = (EItem) => {
  const [activeComponent, setActiveComponent] = useState('item'); // 현재 표시되는 탭 상태

  // 탭 클릭 시 상태 변경 핸들러
  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  // 각 컴포넌트 DOM 참조
  const containerRef = useRef(null);
  const itemRef = useRef(null);
  const avatarRef = useRef(null);
  const statRef = useRef(null);
  const detailStatRef = useRef(null);
  const buffRef = useRef(null);
  const talismanRef = useRef(null);

  const [height, setHeight] = useState(); // 현재 표시 중인 컴포넌트 높이


  // 선택된 탭의 컴포넌트 높이를 계산하여 부모 컨테이너에 적용
  useEffect(() => {
    const refs = {
      item: itemRef,
      avatar: avatarRef,
      stat: statRef,
      detailStat: detailStatRef,
      buff: buffRef,
      talisman: talismanRef,
    };
  
    const observer = new ResizeObserver(() => {
      const activeRef = refs[activeComponent];
      if (activeRef?.current) {
        setHeight(activeRef.current.offsetHeight);
      }
    });
  
    const activeRef = refs[activeComponent];
    if (activeRef?.current) {
      observer.observe(activeRef.current);
    }
  
    return () => {
      observer.disconnect();
    };
  }, [activeComponent]);

  // 전환 애니메이션과 겹쳐진 컴포넌트 처리를 위한 공통 스타일
  const CommonStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <Container style={{ height: "auto", minWidth: "1200px" }}>
      <div className="character-info-bot" style={{ marginTop: "30px", minWidth: "1050px" }}>
        
        {/* 탭 메뉴 영역 */}
        <Row className='menubar'>
          {[
            { key: 'item', label: '장착장비' },
            { key: 'stat', label: '스탯' },
            { key: 'detailStat', label: '세부스탯' },
            { key: 'avatar', label: ['아바타', '크리쳐'] },
            { key: 'buff', label: '버프강화' },
            { key: 'talisman', label: '탈리스만' },
          ].map(tab => (
            <Col
              key={tab.key}
              onClick={() => handleClick(tab.key)}
              style={{
                cursor: 'pointer',
                fontWeight: activeComponent === tab.key ? 'bold' : '',
                borderBottom: activeComponent === tab.key ? '2px solid black' : '',
                paddingTop: tab.key === 'avatar' ? '3px' : '',
                marginBottom: tab.key === 'avatar' ? '2px' : '',
              }}
            >
              {Array.isArray(tab.label)
                ? tab.label.map((line, idx) => <div key={idx}>{line}</div>)
                : tab.label}
            </Col>
          ))}
        </Row>

        {/* 탭 내용 컨테이너 */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            height: `${height}px`,
            transition: 'height 0.3s ease',
          }}
        >
          {/* 각 컴포넌트: 조건에 따라 페이드 및 스케일 효과 */}
          <div
            ref={itemRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'item' ? 1 : 0,
              transform: activeComponent === 'item' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'item' ? 'auto' : 'none',
            }}
          >
            <ItemInfo EItem={EItem} />
          </div>

          <div
            ref={statRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'stat' ? 1 : 0,
              transform: activeComponent === 'stat' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'stat' ? 'auto' : 'none',
            }}
          >
            <StatInfo />
          </div>

          <div
            ref={detailStatRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'detailStat' ? 1 : 0,
              transform: activeComponent === 'detailStat' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'detailStat' ? 'auto' : 'none',
            }}
          >
            <DetailStat />
          </div>

          <div
            ref={avatarRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'avatar' ? 1 : 0,
              transform: activeComponent === 'avatar' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'avatar' ? 'auto' : 'none',
            }}
          >
            <Avata />
          </div>

          <div
            ref={buffRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'buff' ? 1 : 0,
              transform: activeComponent === 'buff' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'buff' ? 'auto' : 'none',
            }}
          >
            <Buff />
          </div>

          <div
            ref={talismanRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'talisman' ? 1 : 0,
              transform: activeComponent === 'talisman' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'talisman' ? 'auto' : 'none',
            }}
          >
            <Talisman />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CharacterDetailBotCard;