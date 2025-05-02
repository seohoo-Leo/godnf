import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useTalisman } from '../../../hooks/useTalisman';
import { Row, Col } from 'react-bootstrap';
import { useSkill } from '../../../hooks/useSkill';

const Talisman = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name');
    

    const{data} = useTalisman(server,Name);
  
    const talisman = data?.talismans|| [];
    
    const runesType = (runetype) => {

      let runeColor = ""

      if(runetype.includes("테라코타")){return runeColor="purple" }
      else if(runetype.includes("서클 메이지")){return runeColor= "green"}
      else if(runetype.includes("수호자들")){return runeColor="blue"}
      else if(runetype.includes("고대 도서관")){return runeColor="yellow"}
      else if(runetype.includes("세컨드 팩트")){return runeColor="red"}

      return runeColor
    }
    
  return (
    <Row style={{margin:"2%"}}> 
     {talisman?.map(items =>
        <Col className='talisman-card'>
           <Col className="talisman-name">{items?.talisman.itemName}</Col>
            <Col className="talisman-img"> 
               <img src={`https://img-api.neople.co.kr/df/items/${items?.talisman.itemId}`} 
                    style={{width:"80px", height:"80px"}}/> </Col>
            <Col>
            <ul className='talisman-ul'>
              {console.log(items.runes[0])}
              {items?.runes?.map(runes => {return (
                                      <li style={{color:`${runesType(runes?.itemName)}` }}>{runes?.itemName}</li>)}) 
                       }
            </ul>
            </Col>
        </Col>)
        }
    </Row>
  )
}

export default Talisman
