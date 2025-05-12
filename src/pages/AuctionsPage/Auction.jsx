import React from 'react'
import { Row, Col} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import "./Auction.style.css";
import { useAuction } from '../../hooks/useAuction';
import useItemInfo from '../../store/useItemInfo';
import Filter from './components/Filter';


function Auction() {

  const{job,grade,results,expandedItemId, setExpandedItemId} = useItemInfo();

    // 데이터 훅 사용
  const { data } = useAuction(expandedItemId, grade);
 
   // 경매 데이터 유무 확인
  const isEmptyData = (data) => {
    return !data?.rows || data.rows.length === 0 || (data.rows.length === 1 && data.rows[0] === null);
  };

  // 남은 시간 계산
  const TimeLeft = (expireDate) => {
    const now = new Date();
    const end = new Date(expireDate);
    const diffMs = end - now;
    if (diffMs <= 0) return <span>만료됨</span>;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    return <span>{hours}시간</span>;
  };


  // 아이템 클릭 시 상세 정보 표시
  const showAuction = (itemId) => {
    setExpandedItemId(prev => prev === itemId ? null : itemId);
    console.log(expandedItemId);
    
  };

  console.log(expandedItemId);
  


  return (
    <div className="auction">
        {/* 필터 영역 */}
        <Filter/>
        {/* 검색 결과 영역 */}
      <Container className='auction_item_card'>
        <Row style={{ width: "100%", height: "fit-content" }}>
          {results?.length > 0 ? results?.map((item) => (
            <Col xs={12} className="card" onClick={() => showAuction(item?.itemId)}>
              <Row style={{ width: "100%", marginBottom: "10px" }}>
                <Col xs={3}  md={4}  lg={3} className="img">
                  <img src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`}
                    style={{ height: "60px" }} />
                </Col>
                <Col xs={8} md={7} lg={7} className='item-text-Info'>
                  <Col xs={4} style={{ color: "blue", fontWeight: "500" }}>{item?.itemAvailableLevel} Lv</Col>
                  <Col xs={8} className={`item-name ${item?.itemRarity}`}>{item?.itemName}</Col>
                </Col>
              </Row>
              {expandedItemId === item.itemId && (
                <Row style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  {data?.rows?.filter(AItem => AItem && AItem?.enchant?.reinforceSkill?.[0]?.jobName === job).map(AItem => (
                    <Row style={{ marginTop: "3px", marginBottom: "3px", display: "flex", flexDirection: "row", alignItems: "center", border: "0.3px solid black" }}>
                      <Col xs={4}  md={3} style={{ color: "#d79c12" }}> {AItem?.unitPrice?.toLocaleString()} G </Col>
                      <Col className="d-none d-md-block" md={2}> {TimeLeft(AItem.expireDate)}</Col>
                      <Col xs={4} md={3}> {AItem?.enchant?.reinforceSkill?.[0]?.skills?.[0]?.name}</Col>
                      <Col xs={2}  md={2}>
                        {AItem?.enchant
                          ? AItem.enchant.reinforceSkill[0].skills[0].value + "Lv" : "+" + AItem?.refine}
                      </Col>
                      <Col xs={2} md={2}>{AItem?.count} 개 </Col>
                    </Row>
                  ))}

                  {data?.rows?.filter(AItem => AItem && !AItem?.enchant ).map(AItem => (
                    <Row style={{ marginTop: "3px", marginBottom: "3px", display: "flex", flexDirection: "row", alignItems: "center", border: "0.3px solid black" }}>
                      <Col xs={6} sm={5} md={4} style={{ color: "#d79c12" }}> {AItem?.unitPrice?.toLocaleString()} G</Col>
                      <Col className="d-none d-md-block" md={4}> {TimeLeft(AItem.expireDate)} </Col>
                      <Col xs={3} sm={2} md={2}>{"+" + AItem?.refine} </Col>
                      <Col xs={3} sm={2} md={2}> {AItem?.count} 개</Col>
                    </Row>
                  ))}

                  {isEmptyData(data) &&
                    <Col style={{ textAlign: "center" }}>등록된 상품이 없습니다.</Col>}

                </Row>
              )}
            </Col>
          )) : (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-search display-4 d-block mb-3"></i>
              <h5 className="fw-semibold">검색 결과가 없습니다</h5>
              <p>조건을 변경하거나 다른 검색어를 시도해보세요.</p>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Auction
