import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, CardText } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import "./Auction.style.css";
import SearchFilter from './components/SearchFilter';
import { useAuction } from '../../hooks/useAuction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DetailFilter from './components/DetailFilter';
import ItemCard from './components/ItemCard';
import { useItemName } from '../../hooks/useItemName';


const CATEGORIES = ["전체", "무기", "방어구", "소모품", "액세서리"];
const JOBS = ["전체", "귀검사/다크나이트/나이트", "격투가", "거너", "프리스트", "마법사/크리에이터", "도적", "마창사", "총검사", "아처"];


const JOB_WEAPONS = {
  전체: ["전체"],
  "귀검사/다크나이트/나이트": ["전체","소검", "도", "둔기", "대검", "광검"],
  격투가: ["전체","너클", "건틀릿", "클로", "권투글로브", "통파"],
  거너: ["전체", "리볼버", "자동권총", "머스켓", "핸드캐넌", "보우건"],
  프리스트: ["전체", "십자가","염주", "토템", "낫", "배틀액스"],
  "마법사/크리에이터": ["전체","창", "봉", "로드", "스탭", "빗자루"],
  도적: ["전체", "단검", "쌍검", "완드", "차크라 웨펀"],
  마창사: ["전체", "장창", "미늘창", "광창", "투창"],
  총검사: ["전체", "장도", "소태도", "중검", "코어블레이드"],
  아처: ["전체", "선현궁", "장궁", "크로스슈터", "에테리얼 보우"],
};

const ARMOR_TYPES = ["전체", "상의", "머리어께","하의","신발","벨트"]
const GRADES = ["전체", "커먼", "언커먼", "레어","유니크","에픽", "레전더리","태초"];
const ACCESSORY_TYPES = ["전체", "목걸이", "반지","팔찌"]


const Auction = ( ) => {
 

  const [category, setCategory] = useState("전체");
  const [job, setJob] = useState("전체");
  const [weapon, setWeapon] = useState("전체");
  const [grade, setGrade] = useState("전체");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [madeQuery, setMadeQuery] =useState("전체");
  const [expandedItemId, setExpandedItemId] = useState(null);

    let weaponOptions = ["전체"];
      if(category === "무기"){
        weaponOptions = JOB_WEAPONS[job] || ["전체"];
      }else if( category==="방어구") {
        weaponOptions = ARMOR_TYPES ;
      }else if( category ==="액세서리"){
        weaponOptions = ACCESSORY_TYPES;
      }

      const buildQuery = () => {
        let parts = [];
        if(query) parts.push(query);
        if(weapon !=="전체") parts.push(weapon);
        return parts.join(" ");
      }

    const {data} = useAuction(expandedItemId,grade);
    const {data:iteminfo} = useItemName(madeQuery,grade);

    const handleSearch = () =>{

     const searchQuery = buildQuery();
      setMadeQuery(searchQuery)
      setExpandedItemId(null);
    }
    

      useEffect(()=>{
        if(!iteminfo?.rows) return;

        const filtered = iteminfo.rows.filter(item => {
          const matchCategory = category === "전체" || item.itemType === category;
          const matchGrade = grade === "전체" || item.itemRarity === grade;
          console.log(category);
          return matchCategory && matchGrade;
          
        }); 
        setResults(filtered);

      },[iteminfo, category, grade])
    

      console.log(expandedItemId);



    const showAuction = (itemId) =>{
      setExpandedItemId(prev => prev === itemId ? null : itemId);
    }

  return (
    <div className="auction">
      <div className="row g-2 mb-4">
        <div className="col-md">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md">
          <select value={job} onChange={(e) => setJob(e.target.value)} className="form-select" disabled={category !== "무기" } >
            {category=== "무기"?JOBS.map((j) => (
              <option key={j}>{j}</option>
            )):""}
          </select>
        </div>

        <div className="col-md">
          <select value={weapon} onChange={(e) => setWeapon(e.target.value)} className="form-select">
            {weaponOptions?.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>

        <div className="col-md">
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="form-select">
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="col-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="아이템 이름"
            className="form-control"
          />
        </div>

        <div className="col-md-auto">
          <button onClick={handleSearch} className="btn btn-primary w-100">
            검색
          </button>
        </div>
      </div>
        <Container className='auction_item_card'>
        <Row style={{width:"100%", height:"fit-content"}}>
          { results?.length >0 ? results?.map((item) => (
              <Col xs={12} sm={12} md={6} className="card" 
                  onClick={()=>showAuction(item?.itemId)}>
              <Row style={{width:"100%", paddingBottom:"4%"}}>
                 <Col xs={3} md={2} md={4} lg={3} className="img">
                 <img src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`}
                       style={{height:"60px"}}/>
                 </Col>
                 <Col xs={8} md={7} lg={7} className='item-text-Info'>
                    <Col className={`item-name ${item?.itemRarity}`}> 
                      {item?.itemName}
                    </Col>
                 </Col>
                </Row>
                {expandedItemId === item.itemId&&(
                    <Row style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        {data?.rows!==null &&data?.rows?.map(AItem => 
                            <Row style={{marginTop:"1%", marginBottom:"1%", display:"flex" ,flexDirection:"row", alignItems:"center",border:"0.3px solid black"}}>
                            
                            <Col sm={8} style={{textAlign:"center"}}>{AItem?.unitPrice?.toLocaleString()} 골드 </Col>
                            <Col sm={4}>{AItem?.count} 개 </Col>    
                           </Row>  )}
                           {data?.rows.length < 1? <Col style={{textAlign:"center"}}>등록된 상품이 없습니다.</Col> :"" }
                      </Row>
                )}     
             </Col> 
          )) :<div className="text-center py-5 text-muted">
                <i className="bi bi-search display-4 d-block mb-3"></i>
                <h5 className="fw-semibold">검색 결과가 없습니다</h5>
                <p>조건을 변경하거나 다른 검색어를 시도해보세요.</p>
              </div> } 
          </Row>
        </Container>
    </div>
  );
}

export default Auction
