import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import "./Auction.style.css";
import SearchFilter from './components/SearchFilter';
import { useAuction } from '../../hooks/useAuction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DetailFilter from './components/DetailFilter';
import ItemCard from './components/ItemCard';

const Auction = ( ) => {

      const navigate = useNavigate();


      const [selectedTypes , setSelectedType] = useState({
        type: [{value: ["귀검사(남)","귀검사(여)","다크나이트", "나이트"],label: '귀검사/다크나이트/나이트'},
                { value: ['격투가(여)','격투가(남)'], label: '격투가' },
                { value: ['거너(남)','거너(여)'], label: '거너' },
                { value: ['프리스트(남)','프리스트(여)'], label: '프리스트' },
                { value: ['마법사(남)','마법사(여)','크리에이터'], label: '마법사/크리에이터' },
                { value: ['도적'], label: '도적' },
                { value: ['마창사'], label: '마창사' },
                { value: ['총검사','총검사'], label: '총검사' },
                { value: ['아처'], label: '아처' },
              ],
        value: '무기',
        typeDetail: ''
      })

    
      console.log("타입 값 :", selectedTypes);
      

  const handleSearch = (filters) => {
    console.log("검색 조건:", filters);
    navigate(`?itemName=${filters.name}&rarity=${filters.rarity}`)
  };



  return (<div>
    <Container className='auction'>
      <Row className='total_box'>
        <SearchFilter onSearch={handleSearch} selectedType={selectedTypes} setSelectedType={setSelectedType} />
        <Col className="result_card"> 
              <Col xs={3} lg={2} xl={2}className="search_filter">
                 <DetailFilter selectedTypes={selectedTypes} setSelectedType={setSelectedType}/>
                </Col>
              <Col xs={9} lg={9}  xl={9} className="search_result">
              <ItemCard selectedTypes={selectedTypes}/> 
              </Col>
         </Col>
      </Row>
    </Container>
  </div>
  );
}

export default Auction
