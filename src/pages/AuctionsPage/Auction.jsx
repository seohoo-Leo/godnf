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


const CATEGORIES = ["전체", "무기", "방어구","액세서리","특수장비", "칭호" ];
const JOBS = ["전체", "귀검사/다크나이트/나이트", "격투가", "거너", "프리스트", "마법사/크리에이터", "도적", "마창사", "총검사", "아처"];
const JOBSDETAIL = ["전체", "귀검사(남)","귀검사(여)", "격투가(남)","격투가(여)", "거너(남)","거너(여)", "프리스트(남)","프리스트(여)", "마법사(남)","마법사(여)", "도적","나이트", "마창사", "총검사","다크나이트","크리에이터", "아처"]

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
const SPECIALGEAR_TYPES=["보조장비", "마법석" , "귀걸이"] 

const Auction = ( ) => {
 

  const [category, setCategory] = useState("전체");
  const [job, setJob] = useState("전체");
  const [weapon, setWeapon] = useState("전체");
  const [grade, setGrade] = useState("전체");
  const [query, setQuery] = useState("전체");
  const [results, setResults] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);

    let weaponOptions = ["전체"];
      if(category === "무기"){
        weaponOptions = JOB_WEAPONS[job] || ["전체"];
      }else if( category==="방어구") {
        weaponOptions = ARMOR_TYPES ;
      }else if( category ==="액세서리"){
        weaponOptions = ACCESSORY_TYPES;
      }else if( category === "특수장비"){
        weaponOptions = SPECIALGEAR_TYPES;
      }else if( category==="칭호"){
        weaponOptions= JOBSDETAIL;
      }

      // const buildQuery = () => {
      //   let parts = [];
      //   if(query) parts.push(query);
      //   if(weapon !=="전체") parts.push(weapon);
      //   return parts.join(" ");
      // }

    const {data} = useAuction(expandedItemId,grade);
    const {data:iteminfo} = useItemName(query,grade);

    const handleSearch = () =>{

    if(!iteminfo?.rows) return;

    const filtered = iteminfo.rows.filter(item => {
      if(category=== "특수장비")
         {const matchCategory = item.itemType === "추가장비";
          const matchGrade = grade === "전체" || item.itemRarity === grade;
          return matchCategory && matchGrade;
          }else if(category==="칭호"){
          const matchCategory = item.itemTypeDetail === "칭호";
          const matchGrade = grade === "전체" || item.itemRarity === grade;
          return matchCategory && matchGrade;
          }else{ const matchCategory = category === "전체" || item.itemType === category;
            const matchGrade = grade === "전체" || item.itemRarity === grade;
            return matchCategory && matchGrade;
        }
    }); 
      setResults(filtered);
      setExpandedItemId(null);
    }
    
      console.log(data);

      //현재시간 기준으로 남은시간 보여주기 
      const TimeLeft = (expireDate) => {
          const now = new Date();
          const end = new Date(expireDate);
          const diffMs= end -now

          if(diffMs <= 0 ) return <span>만료됨</span>

          const diffMinutes = Math.floor(diffMs/(1000 * 60))
          const hours = Math.floor(diffMinutes /60);

          return (
            <span> {hours}시간 </span>
          );
      }




      // 옥션 보여주기
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
          <select value={job} onChange={(e) => setJob(e.target.value)} className="form-select" disabled={category !== "무기" && category!=="칭호" } >
            {category=== "무기" ?JOBS.map((j) => (
              <option key={j}>{j}</option>
            )):""}
             {category=== "칭호" ?JOBSDETAIL.map((j) => (
              <option key={j}>{j}</option>
            )):""}
    
          </select>
        </div>

        <div className="col-md">
          <select value={weapon} onChange={(e) => setWeapon(e.target.value)} className="form-select" disabled={category ==="칭호"}>
            {category !=="칭호" ?weaponOptions?.map((w) => (
              <option key={w}>{w}</option>
            )) : ""}
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
              <Col xs={12} sm={12} md={12} className="card" 
                  onClick={()=>showAuction(item?.itemId)}>
              <Row style={{width:"100%", marginBottom:"10px"}}>
                 <Col xs={3} md={2} md={4} lg={3} className="img">
                 <img src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`}
                       style={{height:"60px"}}/>
                 </Col>
                 <Col xs={8} md={7} lg={7} className='item-text-Info'>
                  <Col xs={4} style={{color:"blue", fontWeight:"500"}}>{item?.itemAvailableLevel} Lv</Col>
                    <Col xs={8} className={`item-name ${item?.itemRarity}`}> 
                      {item?.itemName}
                    </Col>
                 </Col>
                </Row>
                {expandedItemId === item.itemId&&(
                    <Row style={{width:"100%", display:"flex", justifyContent:"center"}}>
                        { data?.rows?.filter(AItem => 
                            AItem &&
                           AItem?.enchant?.reinforceSkill?.[0]?.jobName === job 
                          ).map(AItem=>( 
                                <Row style={{marginTop:"3px", marginBottom:"3px", display:"flex" ,flexDirection:"row", alignItems:"center",border:"0.3px solid black"}}>
                                <Col xs={4} sm={4} md={3} style={{ color:"#d79c12"}}>
                                  {AItem?.unitPrice?.toLocaleString()} G
                                 </Col>
                                 <Col className="d-none d-md-block" md={2}>
                                    {TimeLeft(AItem.expireDate)}
                                 </Col>
                                <Col xs={4}sm={4} md={3} > 
                                   { AItem?.enchant?.reinforceSkill?.[0]?.skills?.[0]?.name }
                                </Col>
                                <Col xs={2}sm={2} md={2} >
                                    {AItem?.enchant 
                                      ? AItem.enchant.reinforceSkill[0].skills[0].value +"Lv" : "+"+AItem?.refine}
                                </Col>
                                <Col  xs={2} sm={2} md={2} >
                                  {AItem?.count} 개 
                                </Col>    
                               </Row> 
                              ))}

                  { data?.rows?.filter(AItem => 
                            AItem &&
                           !AItem?.enchant  
                          ).map(AItem=>( 
                                <Row style={{marginTop:"3px", marginBottom:"3px", display:"flex" ,flexDirection:"row", alignItems:"center",border:"0.3px solid black"}}>
                                <Col xs={6} sm={5} md={4} style={{ color:"#d79c12"}}>
                                  {AItem?.unitPrice?.toLocaleString()} G
                                 </Col>
                                 <Col className="d-none d-md-block"  md={4}>
                                    {TimeLeft(AItem.expireDate)}
                                 </Col>
      
                                <Col xs={3}sm={2} md={2} >
                                    { "+"+AItem?.refine}
                                </Col>
                                <Col  xs={3} sm={2} md={2} >
                                  {AItem?.count} 개 
                                </Col>    
                               </Row> 
                              ))}
                              
              
                           {!data?.rows&& 
                                <Col style={{textAlign:"center"}}>등록된 상품이 없습니다.</Col>
                                }
                             
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
