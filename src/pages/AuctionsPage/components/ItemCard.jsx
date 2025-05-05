import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import { useAuction } from '../../../hooks/useAuction';



const ItemCard = ({selectedTypes}) => {

          const [query,setQuery] =useSearchParams();
          const itemName = query.get("itemName");
          const rarity = query.get("rarity");
        

          const {data} = useAuction(itemName,rarity)

       
          const auctionItem = data?.rows?.map(a=>a.itemType=== selectedTypes.value? a : "")
          
          console.log(data  );
          


  return (
    <Container className ="auction_item_card">
       <Row style={{height:"100%"}}>
      {auctionItem?.map((item=> item.itemName !==undefined?
            <Col xs={6} sm={6} className='card'>
              <Col xs={12} sm={12} className='img'>
                  <img src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`}
                        style={{height:"50px"}}/>
              </Col>
              <Col xs={12} sm={12}>
                <div className={`item-name ${item?.itemRarity}`}> 
                  {item?.itemName}
                </div>
               </Col>
              <Col className="d-none d-lg-block"> 판매가</Col>
              <Col xs={12} sm={12} className='item-price'>{`${(item?.currentPrice)?.toLocaleString()} 골드`}</Col>
            </Col> : ""
    
            ))} 
         </Row>
       
    </Container>
  )
}

export default ItemCard
