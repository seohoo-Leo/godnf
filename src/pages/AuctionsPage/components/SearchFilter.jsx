import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

// 무기 - 

// { value: '무기', label: '무기형상' },
// { value: '방어구', label: '방어구' },
// { value: '추가장비', label: '특수장비' },
// { value: '악세사리', label: '악세서리'},
// { value: '악세사리', label: '칭호'},
// { value:  "스태커블", label: '레시피' },
// { value:  "스태커블", label: '패키지' },
// { value:  "스태커블", label: '소모품'  },
// { value:  "스태커블", label: '엠블렘' },
// { value:  "스태커블", label: '전문직업' },
// { value:  "스태커블", label: '마법부여' },
// { value: '아바타', label: '아바타' },
// { value: '아바타', label: '클론아바타' },
// { value: '크리쳐', label: '크리쳐' },



    const typeOptions = [
        { value: [
          { value: ["귀검사(남)","귀검사(여)","다크나이트", "나이트"],detail:["소검", "도", "둔기", "대검", "광검"] ,label: '귀검사/다크나이트/나이트' },
          { value: ['격투가(여)','격투가(남)'],detail:["너클", "건틀릿", "클로", "권투글로브", "통파"], label: '격투가' },
          { value: ['거너(남)','거너(여)'],detail:["리볼버", "자동권총", "머스켓", "핸드캐넌", "보우건"], label: '거너' },
          { value: ['프리스트(남)','프리스트(여)'], detail:["십자가","염주", "토템", "낫", "배틀액스"] ,label: '프리스트' },
          { value: ['마법사(남)','마법사(여)','크리에이터'],detail:["창", "봉", "로드", "스탭", "빗자루"], label: '마법사/크리에이터' },
          { value: ['도적'],detail:["단검", "쌍검", "완드", "차크라 웨펀"], label: '도적' },
          { value: ['마창사'],detail:["장창", "미늘창", "광창", "투창"], label: '마창사' },
          { value: ['총검사','총검사'],detail:["장도", "소태도", "중검", "코어블레이드"], label: '총검사' },
          { value: ['아처'],detail:["선현궁", "장궁", "크로스슈터", "에테리얼 보우"], label: '아처' },
            ], 
          label: '무기' }
      ];
  
  const rarityOptions = [
    { value: '전체', label: '전체' },
    { value: '커먼', label: '커먼' },
    { value: '언커먼', label: '언커먼' },
    { value: '레어', label: '레어' },
    { value: '유니크', label: '유니크' },
    { value: '에픽', label: '에픽' },
    { value: '레전더리', label: '레전더리' },
    { value: '태초', label: '태초' },
  ];




const SearchFilter = ({onSearch , selectedType, setSelectedType}) => {

    const [filters, setFilters] = React.useState({
        name: '',
        type: '',
        rarity: '',
        typeDetail:''
      });

     
    
      const handleSelectChange = (selected, action) => {
        setFilters((prev) => ({
          ...prev,
          [action.name]: selected?.value || '',
        }));
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
      };

      const typeSelect = (selected, action) =>{
            setSelectedType((prev)=>({...prev, [action.name]:selected?.value || ''}))
            setFilters((prev) => ({
              ...prev,
              [action.name]: selected?.label || '',
            }));
      }

  return (
    <Form onSubmit={handleSubmit} >
      <Row className="search"> 
    <Col sm={6} md={6}  lg={3} className='item'>
    <Select
            name="type"
            options={typeOptions}
            placeholder="장비 선택"
            onChange={typeSelect}
            menuPlacement="bottom"
            isClearable // 항상 아래로 열림
          />
    </Col>
    <Col sm={6} md={6} lg={3} className='grade'>
    <Select
            name="rarity"
            options={rarityOptions}
            placeholder="등급 선택"
            onChange={handleSelectChange}
            menuPlacement="bottom"
            isClearable // 항상 아래로 열림
          />
    </Col>
    <Col sm={12} md={12}  lg={4}className="textbar">
    <Form.Control
            type="text"
            placeholder="아이템 이름"
            name="name"
            value={filters.name}
            onChange={handleChange}
          />
    </Col>
    <Col sm={12}  md={12} lg={2}className='bt'>
            <Button type="submit" variant="primary" className="w-100">
            검색
          </Button>
    </Col>
    </Row>
  </Form>
  )
}

export default SearchFilter
