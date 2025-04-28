import React from 'react'
import { useAvata } from '../../../hooks/useAvata'
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

const Avata = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')
    const{data} = useAvata(server, Name)

    const avatInfo = (data?.map((avata) =>{ 
         return { 
            avata : avata?.avatar,
            avataImg : avata?.avatarImage,
            clone : avata?.clone,
            cloneImg : avata?.cloneImage}}))

    console.log(avatInfo?.cloneImg);
    

  return (
    <Col>
        {avatInfo?.map(avata=>
            <Row className="avatar">
              <Col className="slotName" style={{ flex: "0 0 150px" , height:"40px"}}>{avata.avata.slotName}</Col>
              {avata.avataImg &&(
                <Col style={{ flex: "0 0 100px"  ,display:"flex", justifyContent:"flex-end"}}>
                <img src={avata.avataImg} style={{height:"35px" , margin:"3px"}}/> 
                </Col>
                )}
              {avata.cloneImg !== null && (
               <Col style={{ flex: "0 0 60px" , display:"flex",margin :"0px" , padding:"0px"}}>
              <img src={avata.cloneImg} style={{height:"35px"}}/>
              </Col>)}
              
              <Col  style={{ flex: "0 0 350px",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"  }}>  
              { avata.clone["itemId"] === null? <Col>{avata.avata.itemName}</Col>:<Col >{avata.clone["itemName"]}</Col> }
              {<Col style={{fontSize:"small"}}> {avata?.avata.optionAbility}</Col>}
              </Col>
               {console.log(avata.avata.emblems !== null &&(avata.avata.emblems))}
               <Col style={{marginRight: "30px"}}>{avata.avata.emblems !== null &&(
                            avata.avata.emblems).map(emb => 
                                                <Row className= {emb.itemRarity}
                                                    style={{fontSize:"small" ,justifyContent:"flex-end", display:"flex"}}> {emb.itemName}</Row>)}
                </Col>
          </Row>
           )}
           <hr/>
           <Row className='avatar'>


           </Row>
    </Col>
  )
}

export default Avata
