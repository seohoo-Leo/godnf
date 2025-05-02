import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ItemInfo from './ItemInfo'
import StatInfo from './StatInfo'
import Avata from './Avata'
import Buff from './Buff'
import Talisman from './Talisman'
import DetailStat from './DetailStat'

const CharacterDetailBotCard = (EItem) => {

  const [activeComponent,setActiveComponent] = useState('item');

  console.log("activeComponet : ", activeComponent);
  

  const handleClick = (componentName) => {
    setActiveComponent(componentName);         // 컴포넌트 변경
  };

    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const avatarRef = useRef(null);
    const statRef = useRef(null);
    const detailStatRef = useRef(null);
    const buffRef = useRef(null);
    const talismanRef = useRef(null);
    const [height, setHeight] = useState(itemRef?.current?.offsetHeight);

    useEffect(() => {
      let currentHeight = 0;
      if (activeComponent ==='item' && itemRef.current) {
        currentHeight = itemRef.current.offsetHeight;
      } else if (activeComponent === 'avatar' && avatarRef.current) {
        currentHeight = avatarRef.current.offsetHeight;
      }else if (activeComponent === 'stat' && statRef.current) {
        currentHeight = statRef.current.offsetHeight;
      } else if (activeComponent === 'detailStat'&& detailStatRef.current) {
        currentHeight = detailStatRef.current.offsetHeight; 
      } else if (activeComponent === 'buff'&& buffRef.current) {
        currentHeight = buffRef.current.offsetHeight; 
      }else if (activeComponent === 'talisman'&& talismanRef.current) {
        currentHeight = talismanRef.current.offsetHeight;
      }
      setHeight(currentHeight);
    }, [activeComponent]);

    useEffect(() => {
      let currentHeight = 0;
      if (activeComponent ==='item' && itemRef.current) {
        currentHeight = itemRef.current.offsetHeight;
      } else if (activeComponent === 'avatar' && avatarRef.current) {
        currentHeight = avatarRef.current.offsetHeight;
      }else if (activeComponent === 'stat' && statRef.current) {
        currentHeight = statRef.current.offsetHeight;
      } else if (activeComponent === 'detailStat'&& detailStatRef.current) {
        currentHeight = detailStatRef.current.offsetHeight; 
      } else if (activeComponent === 'buff'&& buffRef.current) {
        currentHeight = buffRef.current.offsetHeight; 
      }else if (activeComponent === 'talisman'&& talismanRef.current) {
        currentHeight = talismanRef.current.offsetHeight;
      }
      setHeight(currentHeight);
    })

      const CommonStyle = {
        position: 'absolute',   // 겹쳐놓기
        top: 0,
        left: 0,
        width: '100%',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      };


  return (
    <Container style={{height:"auto" ,minWidth:"1200px"}}>
        <div className="character-info-bot" style={{marginTop:"30px", minWidth:"1050px"}}>
            <Row className='menubar'>
                <Col onClick={()=>handleClick('item')} 
                    style={{ 
                      cursor: 'pointer', 
                      fontWeight: activeComponent === 'item' ? 'bold' : '' ,
                      borderBottom: activeComponent === 'item' ? '2px solid black': ""
                        }}>장착장비</Col>
                <Col onClick={()=>handleClick('stat')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'stat' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'stat' ? '2px solid black': ""
                          }}>스탯</Col>
                <Col onClick={()=>handleClick('detailStat')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'detailStat' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'detailStat' ? '2px solid black': ""
                          }}>세부스탯</Col>
                <Col onClick={()=>handleClick('avatar')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'avatar' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'avatar' ? '2px solid black': "",
                        paddingTop: "3px",
                        marginBottom: "2px"
                          }}><div>아바타</div>
                             <div>크리쳐</div></Col>
                <Col onClick={()=>handleClick('buff')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'buff' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'buff' ? '2px solid black': ""
                          }}>버프강화</Col>
                <Col onClick={()=>handleClick('talisman')}
                      style={{ 
                        cursor: 'pointer', 
                        fontWeight: activeComponent === 'talisman' ? 'bold' : '' ,
                        borderBottom: activeComponent === 'talisman' ? '2px solid black': ""
                          }}>탈리스만</Col>
            </Row>
            <div 
          ref={containerRef}
          style={{
            position: 'relative',
            height: `${height}px`,
            transition: 'height 0.3s ease',
          }}>
          <div
            ref={itemRef}
            style={{
              ...CommonStyle,
              opacity: activeComponent === 'item' ? 1 : 0,
              transform: activeComponent === 'item' ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: activeComponent === 'item' ? 'auto' : 'none',
            }}
          >
            <ItemInfo  EItem={EItem} />
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
            <StatInfo/>
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
            <DetailStat/>
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
            <Buff/>
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
            <Talisman/>
          </div>
    
    
          {/* 다른 컴포넌트들도 동일하게 */}
        </div>         
        </div>
       
    </Container>
  )
}

export default CharacterDetailBotCard
