import React from 'react'
import { useAvata } from '../../../hooks/useAvata'
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { usePet } from '../../../hooks/usePet';

const Avata = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')
    const{data} = useAvata(server, Name)
     const {data:petData} =usePet(server, Name)

    const avatInfo = (data?.map((avata) =>{ 
         return { 
            avata : avata?.avatar,
            avataImg : avata?.avatarImage,
            clone : avata?.clone,
            cloneImg : avata?.cloneImage}}))

            console.log("아바타 인포 : " , avatInfo);
    

  return (
     <Row style={{margin:"2%"}}>
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
              
              <Col  style={{ flex: "0 0 340px",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"  }}>  
              { avata.clone["itemId"] === null? <Col >{avata.avata.itemName}</Col>:<Col >{avata.clone["itemName"]}</Col> }
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
           
           <Row className='avatar'>
              <Col  className="slotName" style={{ flex: "0 0 150px" , height:"40px"}}>크리쳐</Col>
              {petData &&(
                <Col style={{ flex: "0 0 100px"  ,display:"flex", justifyContent:"flex-end"}}>
                <img src={petData?.CreatureImg} style={{height:"35px" , margin:"3px"}}/> 
                </Col>
                )}
              <Col style={{ flex: "0 0 60px" , display:"flex",margin :"0px" , padding:"0px"}}>
                    {petData?.ArtifactImg?.map(art => { console.log(art) ;return(<Col style={{margin:"2px"}}><img style={{width:"25px", height:"25px"}} src={art} alt={"art"}/></Col>)})}
  
                  </Col>
                {petData?.Creature?.itemName && (
                  <Col  style={{ flex: "0 0 340px",display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"  }}>  
                   <Col>{petData.Creature.itemName}</Col>
                   </Col>
                )}
                <Col style={{marginRight: "30px"}}>
                 {petData?.Creature?.artifact?.map( art => {
                      return <Row className= {`${art?.itemRarity}`}
                                 style={{fontSize:"small" ,justifyContent:"flex-end", display:"flex"}}> {art?.itemName}</Row>}   
                    )} 
               </Col>
           </Row>
           </Row>
    )
}

export default Avata
